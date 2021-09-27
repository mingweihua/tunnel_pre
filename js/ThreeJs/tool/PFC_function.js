/*
    模型的操作方法，必须要传入模型对象，根据具体方法来进行操作

    这样做的好处是：在新的项目，代码可重用高（因为新的项目开发
    Model里面的模型命名是不一样的

 */
class PFC_function {

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

    static showPFC(object,position,chartName,modalName) {
        let name = object.currentName.split("Model")[0];
        if(PFC_function.data[name][position] == undefined){
            var url = "json/" + name + "_" + position + "_pfc.json";
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
                    PFC_function.data[name][position] = Array1;
                    PFC_function.drawChart(PFC_function.data[name][position],chartName,modalName);
                }
            })
        } else {
            console.log("PFC数据已加载");
            PFC_function.drawChart(PFC_function.data[name][position],chartName,modalName);
        }
    }

    static drawChart(Array1,chartName,modalName){
        let min = 0;
        let max = 0;
        for (var i=0;i<Array1.length;i++){
            min = Math.min(min,Array1[i][2]);
            max = Math.max(max,Array1[i][2]);
        }

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
                //方法二：回调函数自己定义悬浮板内容
                formatter:function (params) {
                    // 根据自己的需求返回数据
                    return `<div>总位移(m):${params.data[2]}</div>`
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
            return a;
        }
    }
}