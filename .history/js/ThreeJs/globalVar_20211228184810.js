//Three.js中场景，灯光，控制器等
let renderer, scene, camera,gui;
let controls,raycaster,mouseVector;
let three_helper;
let tween;
let dracoLoader;
var planeObjects = [];
var clock = new THREE.Clock();
let pointer;

raycaster = new THREE.Raycaster();
mouseVector = new THREE.Vector3();
pointer = new THREE.Vector2();


//全局Model变量
let globalModel,currentName;

let modelName_url = {
    BLSModel : {objUrl:"model/BLS.obj",mtlUrl:"model/BLS.mtl",modelBottom:-72,name:"白鹭山隧道"},
    XBModel : {objUrl:"model/XB.obj",mtlUrl:"model/XB.mtl",modelBottom:-50,name:"西边隧道"},
    ZZModel : {objUrl:"model/ZZ.obj",mtlUrl:"model/ZZ.mtl",modelBottom:-45,name:"章庄隧道"},
    YM1Model : {objUrl:"model/YM1.obj",mtlUrl:"model/YM1.mtl",modelBottom:-45,name:"杨梅一隧道"},
    YM2Model : {objUrl:"model/YM2.obj",mtlUrl:"model/YM2.mtl",modelBottom:-46,name:"杨梅二隧道"},
    YTModel : {objUrl:"model/YT.obj",mtlUrl:"model/YT.mtl",modelBottom:-38,name:"严田隧道"},
    XFDModel : {objUrl:"model/XFD.obj",mtlUrl:"model/XFD.mtl",modelBottom:-73,name:"先锋顶隧道"},
    MYS1Model : {objUrl:"model/MYS1.obj",mtlUrl:"model/MYS1.mtl",modelBottom:-30,name:"明月山1号隧道"},
    MYS2Model : {objUrl:"model/MYS2.obj",mtlUrl:"model/MYS2.mtl",modelBottom:-31,name:"明月山2号隧道"},
    MYS3Model : {objUrl:"model/MYS3.obj",mtlUrl:"model/MYS3.mtl",modelBottom:-60,name:"明月山3号隧道"},
    AllModel : {objUrl:"model/all.obj",mtlUrl:"model/all.mtl",modelBottom:-73,name:"完整隧道群"},

	//纵剖模型
	BLSModel_Sec : {objUrl:"model/all.obj",mtlUrl:"model/all.mtl",modelBottom:-73,name:"白鹭山纵剖"},
};

//modelBottom为记录每个模型最底部高程



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