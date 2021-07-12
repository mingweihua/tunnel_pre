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
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setClearColor( 0xcccccc );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, $('#model_webgl').width() / $('#model_webgl').height(), 0.1, 100000000);
    camera.position.set( 500, 800, 1300 );
    camera.lookAt( 0, 0, 0 );



    // init controls
    controls = new THREE.MapControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 5000;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target = new THREE.Vector3(0, 1, 1);


    scene.add( new THREE.AmbientLight( 0xffffff, 0.5 ) );

    let dirLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
    dirLight.position.set( 5, 10, 7.5 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.top	= 2;
    dirLight.shadow.camera.bottom = - 2;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add( dirLight );

    // add helper
    three_helper = new THREE.GridHelper(4000, 60, 0xFF4444, 0x404040);
    three_helper.name = 'three_helper';
    three_helper.scale.z = 1;
    scene.add(three_helper);

    //加载模型
    globalModel = new model('tunnel');
    globalModel.load("model/白鹭山.obj","model/白鹭山.mtl","BLSModel",10);
    //globalModel.load("model/618_all.obj");
    console.log(globalModel);


    //设置云图需要的对象
    lut = new THREE.Lut( colorMap, numberOfColors );


    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    camera.aspect = $('#model_webgl').width() / $('#model_webgl').height();
    camera.updateProjectionMatrix();
    renderer.setSize($('#model_webgl').width(), $('#model_webgl').height());
}

function animate() {
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