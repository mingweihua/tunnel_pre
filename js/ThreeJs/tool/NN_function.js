/*
    模型的操作方法，必须要传入模型对象，根据具体方法来进行操作

    这样做的好处是：在新的项目，代码可重用高（因为新的项目开发
    Model里面的模型命名是不一样的

 */
class NN_function {

    static data = {
        BLS : {
            in : undefined,
            out : undefined
        },
        MYS1 : {
            in : undefined,
            out : undefined
        },
        MYS2 : {
            in : undefined,
            out : undefined
        },
        MYS3 : {
            in : undefined,
            out : undefined
        },
        XB : {
            in : undefined,
            out : undefined
        },
        XFD : {
            in : undefined,
            out : undefined
        },
        YM1 : {
            in : undefined,
            out : undefined
        },
        YM2 : {
            in : undefined,
            out : undefined
        },
        YT : {
            in : undefined,
            out : undefined
        },
        ZZ : {
            in : undefined,
            out : undefined
        }
    }

    static showNN(object,position,chartName,modalName) {
        let name = object.currentName.split("Model")[0];
        if(NN_function.data[name][position] == undefined){
            var url = "json/" + name + "_" + position + "_nn.json";
            $.ajax({
                //请求方式为get
                async: true,
                type: "GET",
                url: url,
                success: function (data) {
                    console.log(data);
                    var Array1= data.map(function (item) {
                        return [
                            item.x,
                            item.y,
                            Math.sqrt(item.disp_x*item.disp_x+item.disp_y*item.disp_y),
                        ];
                    });
                    // console.log(Array1);

                    //保存，后续免得第二次加载，同时用于神经网络中
                    NN_function.data[name][position] = Array1;
                    NN_function.drawChart(NN_function.data[name][position],chartName,modalName);
                }
            })
        } else {
            console.log("NN数据已加载");
            NN_function.drawChart(NN_function.data[name][position],chartName,modalName);
        }
    }

    static showNNError(object,position,chartName,modalName) {
        let name = object.currentName.split("Model")[0];
        if(NN_function.data[name][position] == undefined){
            var url = "json/" + name + "_" + position + "_nn.json";
            $.ajax({
                //请求方式为get
                async: true,
                type: "GET",
                url: url,
                success: function (data) {
                    //console.log(data);
                    var Array1= data.map(function (item) {
                        return [
                            item.x,
                            item.y,
                            Math.sqrt(item.disp_x*item.disp_x+item.disp_y*item.disp_y),
                        ];
                    });
                    // console.log(Array1);

                    //保存，后续免得第二次加载，同时用于神经网络中
                    NN_function.data[name][position] = Array1;
                    NN_function.drawErrorChart(object,position,chartName,modalName);
                }
            })
        } else {
            console.log("NN数据已加载");
            NN_function.drawErrorChart(object,position,chartName,modalName);
        }
    }

    static drawChart(Array1,chartName,modalName){
        var Array2=[];
        let min = 0;
        let max = 0;
        for (var i=0;i<Array1.length;i++){
            Array2.push(Array1[i][2])
            min = Math.min(min,Array1[i][2]);
            max = Math.max(max,Array1[i][2]);
        }
        console.log(min);
        console.log(max);
        var chartDom = document.getElementById(chartName);
        var myChart = echarts.init(chartDom);
        var option = {
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                },
                /*
                                    formatter: '总应力（pa）: ({c})',//方法一：用字符串模板
                */
                //方法二：回调函数自己定义悬浮板内容
                formatter:function (params) { //在此处直接用 formatter 属性
                    /* console.log('打印params');
                     console.log(params)  ;// 打印数据集（我自己的理解是鼠标点中地方的数据集，打印出来看看包括了什么，以便下一步操作）*/
                    var showdata = params;
                    /*console.log('打印showdata.data');//需要用到showdata.data，打印出来看看这是什么
                    console.log(showdata.data)  ;// 打印数据*/
                    // 根据自己的需求返回数据
                    return `<div>总位移(m):${showdata.data[2]}</div>`
                }

            },
            grid: {
                containLabel: true
            },
            xAxis: {
                name: 'X'
            },
            yAxis: {
                name: 'Y'
            },
            series: {
                type: 'custom',
                coordinateSystem: 'cartesian2d',
                data: Array1,
                renderItem: function (params, api) {
                    var pos = api.coord([
                        api.value(0),
                        api.value(1)
                    ]);
                    return {
                        type: 'circle',
                        morph: true,
                        shape: {
                            cx: pos[0],
                            cy: pos[1],
                            r: 4.5
                        },

                        style: {
                            fill: getFromPalette2(api.value(2))
                        },
                        transition: ['shape', 'style']
                    };
                }
            }
        };
        option && myChart.setOption(option);
        $(('#'+modalName)).modal('show');


        function getFromPalette2(value) {
            lut.setMax( max);
            lut.setMin( min);
            const color = lut.getColor( value );
            var a="rgb(" + color.r*255 + "," + color.g*255 + "," + color.b*255  + ")";
            //console.log(a);
            return a;
        }
    }

    static drawErrorChart(object,position,chartName,modalName){
        let name = object.currentName.split("Model")[0];

        let Array1 = NN_function.data[name][position];
        let originalData = PFC_function.data[name][position];
        let data = [];

        let Array2=[];
        let min = 1;
        let max = 0;
        for (let i=0;i<Array1.length;i++){
            let data_ele = [];
            data_ele.push(Array1[i][0]);
            data_ele.push(Array1[i][1]);
            let temp = Math.abs((Array1[i][2]-originalData[i][2])/originalData[i][2]);
            data_ele.push(temp);
            data.push(data_ele);
            Array2.push(temp);
            min = Math.min(min,temp);
            max = Math.max(max,temp);
        }
        console.log(min);
        console.log(max);
        var chartDom = document.getElementById(chartName);
        var myChart = echarts.init(chartDom);
        var option = {
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                },
                /*
                                    formatter: '总应力（pa）: ({c})',//方法一：用字符串模板
                */
                //方法二：回调函数自己定义悬浮板内容
                formatter:function (params) { //在此处直接用 formatter 属性
                    /* console.log('打印params');
                     console.log(params)  ;// 打印数据集（我自己的理解是鼠标点中地方的数据集，打印出来看看包括了什么，以便下一步操作）*/
                    var showdata = params;
                    /*console.log('打印showdata.data');//需要用到showdata.data，打印出来看看这是什么
                    console.log(showdata.data)  ;// 打印数据*/
                    // 根据自己的需求返回数据
                    return `<div>误差:${showdata.data[2]}</div>`
                }

            },
            grid: {
                containLabel: true
            },
            xAxis: {
                name: 'X'
            },
            yAxis: {
                name: 'Y'
            },
            series: {
                type: 'custom',
                coordinateSystem: 'cartesian2d',
                data: data,
                renderItem: function (params, api) {
                    var pos = api.coord([
                        api.value(0),
                        api.value(1)
                    ]);
                    return {
                        type: 'circle',
                        morph: true,
                        shape: {
                            cx: pos[0],
                            cy: pos[1],
                            r: 4.5
                        },

                        style: {
                            fill: getFromPalette2(api.value(2))
                        },
                        transition: ['shape', 'style']
                    };
                }
            }
        };
        option && myChart.setOption(option);
        $(('#'+modalName)).modal('show');


        function getFromPalette2(value) {
            lut.setMax( max);
            lut.setMin( min);
            const color = lut.getColor( value );
            var a="rgb(" + color.r*255 + "," + color.g*255 + "," + color.b*255  + ")";
            //console.log(a);
            return a;
        }
    }
}