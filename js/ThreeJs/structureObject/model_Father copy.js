class model_Father {
	//constructor是一个构造方法，用来接收参数
	constructor(name, scale) {
		//this代表的是实例对象
		this.name = name;
		// 存放模型需要调整位置参数后在Three世界坐标中显示
		this.coordinateOffset = undefined;
		// 存放模型需要调整大小参数后在Three世界坐标中显示
		this.scale = scale;
		// 存放整个模型；
		this.three3dObject = {
			totalObject: undefined
		};
	}

	load(obj_url) {
		var thisObject = this;
		var objLoader = new THREE.OBJLoader();
		objLoader.load(obj_url, function (result) {
			// createMaterial(result);
			// var newObject = thisObject.createMaterial(result);
			// thisObject.three3dObject.totalObject = newObject;
			// console.log(thisObject.three3dObject.totalObject);
			// thisObject.three3dObject.totalObject.scale.x = thisObject.scale;
			// thisObject.three3dObject.totalObject.scale.y = thisObject.scale;
			// thisObject.three3dObject.totalObject.scale.z = thisObject.scale;
			// scene.add(thisObject.three3dObject.totalObject);


			var mesh = result;
			mesh.scale.set(0.03, 0.03, 0.03);
			var object = new THREE.Group();
			scene.add(object);

			//利用for循环分别设置和加载不同地层及颜色渲染
			var geometryGroup = [];
			var materialGroup = [];
			var poGroup = new THREE.Group();
			var stencilGroup = [];
			var planeMatGroup = [];
			var po = [];
			var clippedColorFront = [];


			for (var i = 0; i < mesh.children.length; i++) {


				geometryGroup[i] = mesh.children[i].geometry;

				//模型外表面材质
				materialGroup[i] = new THREE.MeshStandardMaterial({

					color: materialColor[i],
					metalness: 0.1,
					roughness: 0.75,
					clippingPlanes: planes,
					clipShadows: true,
					shadowSide: THREE.DoubleSide,

				});

				// 设置XYZ三个方向剖切面的渲染
				planeObjects[i] = [];
				stencilGroup[i] = [];

				var planeGeom = new THREE.PlaneBufferGeometry(10, 10);
				for (let j = 0; j < 3; j++) {



					var plane = planes[j];

					stencilGroup[i][j] = createPlaneStencilGroup(geometryGroup[i], plane, j + 3 * i + 1);

					// 分地层设置剖切面材质

					planeMatGroup[i] =
						new THREE.MeshStandardMaterial({

							color: materialColor[i],
							metalness: 0.1,
							roughness: 0.75,
							// transparent:true,
							// opacity:1,
							// visible: false,
							clippingPlanes: planes.filter(p => p !== plane),

							stencilWrite: true,
							stencilRef: 0,
							stencilFunc: THREE.NotEqualStencilFunc,
							stencilFail: THREE.ZeroStencilOp,
							stencilZFail: THREE.ZeroStencilOp,
							stencilZPass: THREE.ZeroStencilOp,

						});

					po[i] = new THREE.Mesh(planeGeom, planeMatGroup[i]);
					po[i].onAfterRender = function (renderer) {
						renderer.clearStencil();
					};
					po[i].renderOrder = j + 3 * i + 1.1; //关键步骤：渲染顺序，一定要前一个geometry的三个剖面都渲染完毕再开始第二个geometry的剖面渲染
					object.add(stencilGroup[i][j]);
					poGroup.add(po[i]);
					planeObjects[i].push(po[i]);
					scene.add(poGroup);


				} //结束j循环



				// 外表面网格模型
				clippedColorFront[i] = new THREE.Mesh(geometryGroup[i], materialGroup[i]);
				clippedColorFront[i].castShadow = true;
				clippedColorFront[i].renderOrder = 100;
				object.add(clippedColorFront[i]);


			} // 结束i循环






			var gui = new dat.GUI();
			gui.close();
			gui.add(params, '旋转');

			var control1 = gui.addFolder('剖面控制');
			control1.add(params.clippingplane, 'X辅助剖面').onChange(v => planeHelpers[0].visible = v);
			control1.add(params.clippingplane, 'X剖切控制').min(-1000).max(1000).onChange(d => planes[0].constant = d);
			control1.add(params.clippingplane, 'Y辅助剖面').onChange(v => planeHelpers[1].visible = v);
			control1.add(params.clippingplane, 'Y剖切控制').min(-1000).max(1000).onChange(d => planes[1].constant = d);
			control1.add(params.clippingplane, 'Z辅助剖面').onChange(v => planeHelpers[2].visible = v);
			control1.add(params.clippingplane, 'Z剖切控制').min(-1000).max(1000).onChange(d => planes[2].constant = d);
			control1.open();

			var control2 = gui.addFolder('模型旋转');
			control2.add(params.rotation, '绕X旋转').min(0).max(360).onChange(d => object.rotation.x = (d / 180 * (Math.PI)));
			control2.add(params.rotation, '绕Y旋转').min(0).max(360).onChange(d => object.rotation.y = (d / 180 * (Math.PI)));
			control2.add(params.rotation, '绕Z旋转').min(0).max(360).onChange(d => object.rotation.z = (d / 180 * (Math.PI)));

			control2.open();




			// return object;

		});
	}


}

//分情况设置地层颜色
var materialColor = {
	"0": 0x696969, //隧道
	"1": 0x696969, //隧道
	"2": 0x3CB371, //人工填土层
	"3": 0x4682B4, // 河湖相沉积土层
	"4": 0xDEB887, //坡积土层
	"5": 0xD2691E, //冲积-洪积土层
	"6": 0xEEE8AA, //花岗岩全风化带
	"7": 0xFFFACD, //花岗岩强风化带
	"8": 0xC0C0C0, //花岗岩中等风化带
	"9": 0xF5F5F5, //花岗岩微风化带
	"10": 0x8B4513, //残积土层
}