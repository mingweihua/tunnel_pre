//Three.js中场景，灯光，控制器等
let renderer, scene, camera,gui;
let controls,raycaster,mouseVector;
let three_helper;
let tween;
let dracoLoader;
var planeObjects = [];
var clock = new THREE.Clock();

//全局Model变量
let globalModel,currentName;

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
    AllModel : {objUrl:"model/all.obj",mtlUrl:"model/all.mtl"},
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





//剖切用

//剖切面板初始参数
var params = {
	旋转: false,
	clippingplane: {

		X辅助剖面: false,
		X剖切控制: 0, 
		Y辅助剖面: false,
		Y剖切控制: 0,
		Z辅助剖面: false,
		Z剖切控制: 0,

	},
	rotation: {

		绕X旋转: 0,
		绕Y旋转: 0,
		绕Z旋转: 0

	}
};

//剖切材质参数
var geoImformation = {
	"tunnel_right": {
		color: 0xC8D0D1,
		name: "花岗岩微风化带",
	},
	"tunnel_left": {
		color: 0xC8D0D1,
		name: "花岗岩微风化带",
	},
	"fractures": {
		color: 0x696969,
		name: "花岗岩微风化带",
	},
	0: {
		color: 0x878067,
		name: "花岗岩全风化带",
	},
	1: {
		color: 0x7AE89A,
		name: "人工填土层",
	},
	2: {
		color: 0xD6EFC8,
		name: "河湖相沉积土层",
	},
	"line1": {
		color: 0x696969,
		name: "隧道（左线）",
	},
	"line2": {
		color: 0x696969,
		name: "隧道（右线）",
	},
	3: {
		color: 0x927CCF,
		name: "坡积土层",
	},
	4: {
		color: 0x66F6F9,
		name: "冲积-洪积土层",
	},
	5: {
		color: 0xECC8C8,
		name: "残积土层",
	},
	6: {
		color: 0x878067,
		name: "花岗岩全风化带",
	},
	7: {
		color: 0xC1BAD9,
		name: "花岗岩强风化带",
	},
	8: {
		color: 0x9A9A9A,
		name: "花岗岩中等风化带",
	},
	9: {
		color: 0xC8D0D1,
		name: "花岗岩微风化带",
	},
	
}