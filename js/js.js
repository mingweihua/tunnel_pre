
$(function () {
//echarts_1();
echarts_2();
echarts_4();
echarts_31();
echarts_32();
echarts_33();
echarts_5();
echarts_6();

function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));


    var data = [[23477 ,14057 ,0.0],[23477 ,14057 ,0.0],[27274 ,4923 ,0.0], [26589 ,19741 ,0.0], [25844 ,6911 ,0.0], [29299 ,10092 ,0.0], [20029 ,6887 ,0.0 ],[26049 ,17449 ,0.0 ], [21080 ,17197 ,0.0 ],[20498 ,11172 ,0.0 ],[18651 ,10911 ,0.0 ],[23111 ,5567 ,0.0 ],[22138 ,10835 ,0.0 ],[1731 ,19123 ,0.0 ],[1682 ,23167 ,0.0 ], [320 ,5236 ,0.0 ],[1859 ,25391 ,0.0 ],[32509 ,467790 ,0.0 ],[19508 ,258387 ,0.0 ],[20387 ,383782 ,0.0 ],[57225 ,0 ,1.6 ],[41840 ,0 ,1.3 ],[26455 ,0 ,1.0 ],[11071 ,0 ,0.8 ], [14830 ,494257 ,4.0], [44074 ,416848 ,8.2 ],[23650 ,47064 ,1.3 ],[44060 ,454721 ,11.7 ],[1803 ,149340 ,1.7 ],[47345 ,256683 ,10.2 ],[45609 ,332415 ,10.8 ],[37510 ,63246 ,2.6 ], [19577 ,73984 ,0.5 ],[32391 ,379795 ,4.1 ],[23594 ,62201 ,0.8 ],[48081 ,336381 ,10.7 ],[20561 ,346487 ,12.5 ],[38138 ,351621 ,14.2 ],[46262 ,359547 ,10.7 ],[19150 ,195915 ,5.3 ], [10346 ,225313 ,1.5 ], [34756 ,83473 ,2.1 ], [10207 ,234994 ,1.5 ], [10090 ,242478 ,1.5 ], [8308 ,145465 ,3.2 ], [24134 ,241631 ,2.3 ], [22337 ,291508 ,2.3 ], [27726 ,374350 ,11.3 ], [2063 ,325085 ,2.2 ], [20007 ,175042 ,8.4 ], [25301 ,53904 ,1.5 ], [19189 ,165580 ,1.6 ], [2999 ,204427 ,1.9 ], [13555 ,361889 ,1.8 ], [19491 ,160441 ,6.0 ], [27155 ,145017 ,4.5 ], [35729 ,456796 ,4.9 ], [34219 ,442968 ,4.6 ], [2137 ,58771 ,0.3 ], [31174 ,472678 ,4.3 ], [16939 ,456384 ,2.5 ], [34635 ,431549 ,4.9 ], [13868 ,278795 ,7.4 ], [12558 ,57556 ,0.6 ], [1728 ,114724 ,2.1 ], [18246 ,479509 ,3.1 ], [3318 ,295528 ,13.6 ], [12886 ,278543 ,1.9 ], [3141 ,317544 ,2.1 ], [11165 ,14712 ,0.8 ], [11069 ,29795 ,0.9 ], [10751 ,15223 ,1.0 ], [11069 ,44441 ,0.9 ], [11071 ,75607 ,1.1 ], [41840 ,14622 ,1.4 ], [41838 ,29795 ,1.5 ], [41649 ,15236 ,2.2 ], [39999 ,42940 ,1.7 ], [27635 ,58450 ,1.1 ], [26456 ,75634 ,1.2 ], [57225 ,14622 ,1.7 ], [57223 ,29795 ,1.8 ], [57266 ,15000 ,2.9 ], [57222 ,44441 ,1.9 ], [40768 ,61355 ,1.7 ], [41840 ,75636 ,1.8 ], [72609 ,14622 ,1.9 ], [72609 ,29790 ,2.0 ], [72609 ,14741 ,3.3 ], [72607 ,44517 ,2.1 ], [57225 ,60106 ,2.0 ], [57229 ,75561 ,2.2 ], [88054 ,14628 ,2.0 ], [87994 ,29802 ,2.1 ], [87994 ,14741 ,3.5 ], [87994 ,44456 ,2.1 ], [88155 ,59917 ,2.4 ], [87985 ,75361 ,2.6 ], [87858 ,90802 ,2.8 ], [87891 ,106284 ,2.9 ], [87862 ,121617 ,3.0 ]
    ];
    option = {
        tooltip: {},
        visualMap: {
            max: 10,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        xAxis3D: {
            // type: 'category',
            // data: hours
            type: 'value',
            nameTextStyle:{
                color: 'white',
                fontWeight: 'normal'
            },
            axisLine:{
                lineStyle:{
                    color:'white',
                    width:0.5
                }
            }
        },
        yAxis3D: {
            // type: 'category',
            // data: days
            type: 'value',
            nameTextStyle:{
                color: 'white',
                fontWeight: 'normal'
            },
            axisLine:{
                lineStyle:{
                    color:'white',
                    width:0.5
                }
            }
        },
        zAxis3D: {
            type: 'value',
            nameTextStyle:{
                color: 'white',
                fontWeight: 'normal'
            },
            axisLine:{
                lineStyle:{
                    color:'white',
                    width:0.5
                }
            }
        },
        grid3D: {
            boxWidth: 200,
            boxDepth: 100,
            viewControl: {
                // projection: 'orthographic'
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: true
                },
                ambient: {
                    intensity: 0.3
                }
            }
        },
        series: [{
            type: 'bar3D',
            data: data.map(function (item) {
                return {
                    value: [item[1], item[0], item[2]],
                }
            }),
            shading: 'lambert',

            label: {
                fontSize: 20,
                borderWidth:1
            },

            emphasis: {
                label: {
                    fontSize: 18,
                    color: 'white'
                },
                itemStyle: {
                    color: '#900'
                }
            }
        }]
    }
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }



function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

       option = {
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow'}
    },
    grid: {
        left: '0%',
		top:'10px',
        right: '0%',
        bottom: '4%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
      		data: ['先锋顶','明月1', '明月2', '明月3', '章庄', '白鹭山', '西边', '杨梅1','杨梅2','严田',],
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "white",
                    fontWeight :"bold",
                    fontSize: '7.5',
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "white",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    }],
    series: [
		{
       
        type: 'bar',
        data: [5, 11, 8, 14, 10, 14, 11,7,10,14],
        barWidth:'35%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#27d08a',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    }
		
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
/*function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));

       option = {
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    
    grid: {
        left: '0%',
		top:'10px',
        right: '0%',
        bottom: '2%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
      		data: ['先锋顶','明月1', '明月2', '明月3', '章庄', '白鹭山', '西边', '杨梅1','杨梅2','严田',],
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "white",
                    fontWeight :"bold",
                    fontSize: '7.5',
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "white",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    }],
    series: [{
        type: 'bar',
        data: [17,32,15,38,30,55,20,20,22,40],
        barWidth:'35%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#2f89cf',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    }
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }*/


    function echarts_5(){
        var chartDom = document.getElementById('echart5');
        var myChart = echarts.init(chartDom, 'dark');
        var option;
        var url = "json/XB_in_pfc3.json";
        $.ajax({
            //请求方式为get
            async: true,
            type: "GET",
            url: url,
            success: function (data) {
                // console.log(data);
                var Array1= data.map(function (item) {
                        return [
                            item.x,
                            item.y,
                            item.z,
                            Math.sqrt(item.disp_x*item.disp_x+item.disp_y*item.disp_y+item.disp_z*item.disp_z),
                        ];
                    }
                );
                //通过map方法得到的新数组是一个对象数组，比如以上的Array1一个对象组有四个数据，但是Array.lenght是所有数据的总和
                // console.log(Array1[0][3]);
                drawChart3(Array1);
            }
        })
        var  drawChart3=function (Array1 ) {
            myChart.setOption(
                (option = {
                    //visualMap:视觉映射组件,也就是设置颗粒属性：大小，颜色透明度，颜色随数值大小变化
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
                            return `<div>总位移(m):${params.data[3]}</div>`
                        }

                    },
                    visualMap: {
                        show: false,
                        min: 7.31364E-05,
                        max: 0.000210359,
                        inRange: {
                            symbolSize: 7,
                            color: [
                                '#313695',
                                '#4575b4',
                                '#74add1',
                                '#abd9e9',
                                '#e0f3f8',
                                '#ffffbf',
                                '#fee090',
                                '#fdae61',
                                '#f46d43',
                                '#d73027',
                                '#a50026'
                            ],
                            //颜色透明度
                            colorAlpha: 0.8
                        }
                    },
                    xAxis3D: {
                        type: 'value'
                    },
                    yAxis3D: {
                        type: 'value'
                    },
                    zAxis3D: {
                        type: 'value'
                    },
                    grid3D: {
                        boxWidth:180,
                        boxHeight:120,
                        boxDepth:40,
                        axisLine: {
                            lineStyle: {color: '#fff'}
                        },
                        axisPointer: {
                            lineStyle: {color:'#DC143C'},
                            label:{show: true}
                        },
                        viewControl: {
                            // autoRotate: true
                        }
                    },
                    series: [
                        {
                            type: 'scatter3D',
                            data: Array1,
                            emphasis:{
                                label:{show:false}
                            }
                        }
                    ]
                })
            );
            option && myChart.setOption(option);
        }
    }


function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));

    option = {
	    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#dddc6b'
            }
        }
    },
		    legend: {
    top:'0%',
        data:['破碎带块数','地层数'],
                textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    grid: {
        left: '10',
		top: '30',
        right: '10',
        bottom: '10',
        containLabel: true
    },

    xAxis: [{
        type: 'category',
        boundaryGap: false,
axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },
        axisLine: {
			lineStyle: { 
				color: 'rgba(255,255,255,.2)',
			}

        },

   data: ['先锋顶','明月1', '明月2', '明月3', '章庄', '白鹭山', '西边', '杨梅1','杨梅2','严田']

    }, {

        axisPointer: {show: false},
        axisLine: {  show: false},
        position: 'bottom',
        offset: 20,

       

    }],

    yAxis: [{
        type: 'value',
        axisTick: {show: false},
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
       axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },

        splitLine: {
            lineStyle: {
                 color: 'rgba(255,255,255,.1)'
            }
        }
    }],
    series: [
		{
        name: '破碎带块数',
        type: 'line',
         smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#0184d5',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#0184d5',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: [3,8,2,12,4,5,4,3,2,9]

    }, 
{
        name: '地层数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#00d887',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#00d887',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: [7,9,8,7,7,6,10,8,7,9]

    }, 
	
		 ]

};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));

        var dataStyle = {
	normal: {
		label: {
			show: false
		},
		labelLine: {
			show: false
		},
		//shadowBlur: 40,
		//shadowColor: 'rgba(40, 40, 40, 1)',
	}
};
var placeHolderStyle = {
	normal: {
		color: 'rgba(255,255,255,.05)',
		label: {show: false,},
		labelLine: {show: false}
	},
	emphasis: {
		color: 'rgba(0,0,0,0)'
	}
};
    option = {
        // title: {
        //     text: '某站点用户访问来源',
        //     subtext: '纯属虚构',
        //     left: 'center'
        // },
        tooltip: {
            trigger: 'item',

        },
        // legend: {
        //
        //     orient: 'vertical',
        //     left: 'left',
        // },
        series: [
            {
                name: '隧道长度',
                type: 'pie',
                radius: '50%',
                fontSize :"2" ,
                data: [
                    {value: 2910, name: '白鹭山'},
                    {value: 1740, name: '章庄'},
                    {value: 1325, name: '西边'},
                    {value: 610, name: '杨梅1'},
                    {value: 345, name: '杨梅2'},
                    {value: 3620, name: '严田'},
                    {value: 1268, name: '先锋顶'},
                    {value: 2970, name: '明月1'},
                    {value: 375, name: '明月2'},
                    {value: 3640, name: '明月3'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }





function echarts_31() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb1'));
option = {

	    title: [{
        text: '最大涌水量',
        left: 'center',
        textStyle: {
            color: '#fff',
			fontSize:'10'
        }

    }],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {

top:'70%',
       itemWidth: 10,
        itemHeight: 10,
        data:['MAX-白鹭山','MIN-杨梅2'],
                textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'最大涌水量(m^3/d)',
            type:'pie',
			center: ['50%', '42%'],
            radius: ['40%', '60%'],
                  color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
            label: {show:false},
			labelLine: {show:false},
            data:[
                {value:6310, name:'章庄'},
                {value:13204, name:'MAX-白鹭山'},
                {value:5490, name:'西边'},
                {value:3234, name:'杨梅1'},
                {value:808, name:'MIN-杨梅2'},
                {value:9856, name:'严田'},
                {value:2627, name:'先锋顶'},
                {value:5493, name:'明月1'},
                {value:827, name:'明月2'},
                {value:6460, name:'明月3'},
            ]
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_32() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb2'));
option = {

	    title: [{
        text: '正常涌水量',
        left: 'center',
        textStyle: {
            color: '#fff',
			fontSize:'10'
        }

    }],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {

    top:'70%',
       itemWidth: 10,
        itemHeight: 10,
        data:['MAX-白鹭山','MIN-明月2'],
                textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'正常涌水量（m^3/d）',
            type:'pie',
			center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
            label: {show:false},
			labelLine: {show:false},
            data:[
                {value:3155, name:'章庄'},
                {value:6602, name:'MAX-白鹭山'},
                {value:2745, name:'西边'},
                {value:1617, name:'杨梅1'},
                {value:404, name:'杨梅2'},
                {value:4928, name:'严田'},
                {value:1407, name:'先锋顶'},
                {value:3217, name:'明月1'},
                {value:316, name:'MIN-明月2'},
                {value:3699, name:'明月3'},
            ]
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

function echarts_33() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb3'));
        option = {

            title: [{
                text: '围岩等级',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize:'10'
                }

            }],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position:function(p){   //其中p为当前鼠标的位置
                    return [p[0] + 10, p[1] - 10];
                }
            },
            legend: {

                top:'70%',
                itemWidth: 10,
                itemHeight: 10,
                data:['三级围岩','四级围岩','五级围岩'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize:'12',
                }
            },
            series: [
                {
                    name:'严田隧道（左幅）',
                    type:'pie',
                    center: ['50%', '42%'],
                    radius: ['40%', '60%'],
                    color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],
                    label: {show:false},
                    labelLine: {show:false},
                    data:[
                        {value:34, name:'三级围岩'},
                        {value:46.3, name:'四级围岩'},
                        {value:19.7, name:'五级围岩'},

                    ]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
})



		
		
		


		









