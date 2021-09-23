/*
    模型的操作方法，必须要传入模型对象，根据具体方法来进行操作

    这样做的好处是：在新的项目，代码可重用高（因为新的项目开发
    Model里面的模型命名是不一样的

 */
class PFC_function {

    static showPFC(object,position) {
        let name = object.currentName.split("Model")[0];
        var url = "json/" + name + "_" + position + "_pfc.json";
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
                var Array2=[];
                let min = 0;
                let max = 0;
                for (var i=0;i<Array1.length;i++){
                    Array2.push(Array1[i][2])
                    min = Math.min(min,Array1[i][2]);
                    max = Math.max(max,Array1[i][2]);
                }

                var chartDom = document.getElementById('pfcChart');
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
                            return `<div>总应力（pa）:${showdata.data[2]}</div>`
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
                        data: data.map(function (item) {
                            return [
                                item.x,
                                item.y,
                                Math.sqrt(item.disp_x*item.disp_x+item.disp_y*item.disp_y),
                            ];
                        }),
                        renderItem: function (params, api) {
                            var pos = api.coord([
                                api.value('x'),
                                api.value('y')
                            ]);
                            /* console.log('打印x啦');
                             console.log(api.value('x'));
                             console.log('打印y啦');
                             console.log(api.value('y'));*/
                            var color = getFromPalette2(
                                Array2.shift()
                            );
                            return {
                                type: 'circle',
                                morph: true,
                                shape: {
                                    cx: pos[0],
                                    cy: pos[1],
                                    r: 4.5
                                },

                                style: {
                                    fill: color
                                },
                                transition: ['shape', 'style']
                            };
                        }
                    }
                };
                option && myChart.setOption(option);
                $('#PFCModal').modal('show');


                function getFromPalette2(value) {
                    lut.setMax( max/2);
                    lut.setMin( min);
                    const color = lut.getColor( value );
                    var a="rgb(" + color.r*255 + "," + color.g*255 + "," + color.b*255  + ")";
                    //console.log(a);
                    return a;
                }

            }
        })
    }
}