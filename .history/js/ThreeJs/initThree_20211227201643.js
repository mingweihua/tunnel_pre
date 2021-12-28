function init() { 
    // init renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('model_webgl'),
        antialias: true,
        autoClear: true,
        logarithmicDepthBuffer: true
    });
    renderer.setSize($('#model_webgl').width(), $('#model_webgl').height());
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor( '#0B0B3B' );
    scene = new THREE.Scene();
    /*const texture = new THREE.TextureLoader().load( '/images/sky.jpg' );
    scene.background = texture;*/


    camera = new THREE.PerspectiveCamera(45, $('#model_webgl').width() / $('#model_webgl').height(), 0.1, 100000000);
    camera.position.set( 800, 500, 500 );



    // init controls
    controls = new THREE.MapControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 500000;
    controls.maxPolarAngle = Math.PI * 3 / 4;
    controls.target = new THREE.Vector3(0, 1, -500);


    scene.add( new THREE.AmbientLight( 0xffffff, 0.5 ) );

    let dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( 50, 100, 75 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.top	= 2;
    dirLight.shadow.camera.bottom = - 2;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add( dirLight );

    // add helper
    /*three_helper = new THREE.GridHelper(4000, 60, 0xFF4444, 0x404040);
    three_helper.name = 'three_helper';
    three_helper.scale.z = 1;
    scene.add(three_helper);*/

    //加载模型
    globalModel = new model('tunnel');
    globalModel.load("model/MYS1.obj","model/MYS1.mtl","MYS1Model",1);
    //globalModel.load("model/618_all.obj");
    //console.log(globalModel.three3dObject.group_pouqie.currentModel);


    //设置云图需要的对象
    lut = new THREE.Lut( colorMap, numberOfColors );


    window.addEventListener('resize', onWindowResize, false);


    //添加gui控件
    gui = new dat.GUI({
        autoPlace: false,
        closeOnTop: false
    });
    gui.domElement.id = 'gui';
    document.getElementById("webgl").appendChild(gui.domElement);
    // gui.open();
    gui.add(params, '旋转');

    var control1 = gui.addFolder('剖面控制');
    control1.add(params.clippingplane, 'X辅助剖面').onChange(v => planeHelpers[0].visible = v);
    control1.add(params.clippingplane, 'X剖切控制').min(-1000).max(1000).onChange(d => planes[0].constant = d);
    control1.add(params.clippingplane, 'Y辅助剖面').onChange(v => planeHelpers[1].visible = v);
    control1.add(params.clippingplane, 'Y剖切控制').min(-1000).max(1000).onChange(d => planes[1].constant = d);
    control1.add(params.clippingplane, 'Z辅助剖面').onChange(v => planeHelpers[2].visible = v);
    control1.add(params.clippingplane, 'Z剖切控制').min(-3000).max(3000).onChange(d => planes[2].constant = d);
    control1.open();

    var control2 = gui.addFolder('模型旋转');
    control2.add(params.rotation, '绕X旋转').min(0).max(360).onChange(d => globalModel.three3dObject.group_pouqie.currentModel.rotation.x = (d / 180 * (Math.PI)));
    control2.add(params.rotation, '绕Y旋转').min(0).max(360).onChange(d => globalModel.three3dObject.group_pouqie.currentModel.rotation.y = (d / 180 * (Math.PI)));
    control2.add(params.rotation, '绕Z旋转').min(0).max(360).onChange(d => globalModel.three3dObject.group_pouqie.currentModel.rotation.z = (d / 180 * (Math.PI)));

    control2.open();

    $('#gui').hide();


}

function onWindowResize() {
    camera.aspect = $('#model_webgl').width() / $('#model_webgl').height();
    camera.updateProjectionMatrix();
    renderer.setSize($('#model_webgl').width(), $('#model_webgl').height());
}

function animate() {

    var delta = clock.getDelta();
    if (params["旋转"]) {
        globalModel.three3dObject.group_pouqie.currentModel.rotation.y += delta * 0.2;

    }

    if (planeObjects != undefined) {
        for (let i = 0; i < planeObjects.length; i++) {
            for (let j = 0; j < planeObjects[i].length; j++) {

                var plane = planes[j];
                var po = planeObjects[i][j];
                plane.coplanarPoint(po.position);
                po.lookAt(
                    po.position.x - plane.normal.x,
                    po.position.y - plane.normal.y,
                    po.position.z - plane.normal.z,
                ); //解决剖面位置为负时不显示的问题
            }
        }
    }

    controls.update();
    requestAnimationFrame(animate);
    if (tween != undefined) {
    	TWEEN.update();
	}
    render();
}

function render(){
    renderer.render(scene, camera);
}

//运行函数
init();
animate();

//测试