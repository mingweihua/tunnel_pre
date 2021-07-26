//Three.js中场景，灯光，控制器等
let renderer, scene, camera,gui;
let controls,raycaster,mouseVector;
let three_helper;
let tween;
let dracoLoader;

//全局Model变量
let globalModel;

let modelName_url = {
    BLSModel : {objUrl:"model/BLS.obj",mtlUrl:"model/BLS.mtl"},
    XBModel : {objUrl:"model/XB.obj",mtlUrl:"model/XB.mtl"},
    ZZModel : {objUrl:"model/ZZ.obj",mtlUrl:"model/ZZ.mtl"},
    YM1Model : {objUrl:"model/YM1.obj",mtlUrl:"model/YM1.mtl"},
    YM2Model : {objUrl:"model/YM2.obj",mtlUrl:"model/YM2.mtl"},
    YTModel : {objUrl:"model/YT.obj",mtlUrl:"model/YT.mtl"},
    XFDModel : {objUrl:"model/XFD.obj",mtlUrl:"model/XFD.mtl"},
    MYS1Model : {objUrl:"model/MYS1.obj",mtlUrl:"model/MYS1.mtl"},
    MYS2Model : {objUrl:"model/MYS2.obj",mtlUrl:"model/MYS2.mtl"},
    MYS3Model : {objUrl:"model/MYS3.obj",mtlUrl:"model/MYS3.mtl"},
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