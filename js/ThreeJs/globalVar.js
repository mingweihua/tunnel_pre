//Three.js中场景，灯光，控制器等
let renderer, scene, camera,gui;
let controls,raycaster,mouseVector;
let three_helper;
let tween;
let dracoLoader;

//全局Model变量
let globalModel;

let modelName_url = {
    BLSModel : {objUrl:"model/白鹭山.obj",mtlUrl:"model/白鹭山.mtl"},
    XBModel : {objUrl:"model/西边.obj",mtlUrl:"model/西边.mtl"},
    ZZModel : {objUrl:"model/章庄.obj",mtlUrl:"model/章庄.mtl"},
    YM1Model : {objUrl:"model/YM1.obj",mtlUrl:"model/YM1.mtl"},
    YM2Model : {objUrl:"model/YM2.obj",mtlUrl:"model/YM2.mtl"},
    YTModel : {objUrl:"model/YT.obj",mtlUrl:"model/YT.mtl"},
    XFDModel : {objUrl:"model/XFD.obj",mtlUrl:"model/XFD.mtl"},
};




var pointer;


//云图
var lut, legendLayout;
var mesh, material;
var colorMap;
var numberOfColors;

colorMap = 'rainbow';
numberOfColors = 512;
legendLayout = 'vertical';