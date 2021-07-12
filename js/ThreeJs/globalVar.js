//Three.js中场景，灯光，控制器等
let renderer, scene, camera,gui;
let controls,raycaster,mouseVector;
let three_helper;
let tween;
let dracoLoader;

//全局Model变量
let globalModel;



var pointer;


//云图
var lut, legendLayout;
var mesh, material;
var colorMap;
var numberOfColors;

colorMap = 'rainbow';
numberOfColors = 512;
legendLayout = 'vertical';