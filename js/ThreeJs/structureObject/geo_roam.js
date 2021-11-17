/*
    模型的操作方法，必须要传入模型对象，根据具体方法来进行操作

    这样做的好处是：在新的项目，代码可重用高（因为新的项目开发
    Model里面的模型命名是不一样的

 */


class GeoRoam {

    static start(modelName) {
        controls.dispose();
        console.log(modelName);
        camera.position.set(roamData[modelName].start.x,
            roamData[modelName].start.y,
            roamData[modelName].start.z);
        camera.lookAt(roamData[modelName].end.x,
            roamData[modelName].end.y,
            roamData[modelName].end.z);
        tween = new TWEEN.Tween( camera.position);
        tween.to(roamData[modelName].end,roamData[modelName].time);
        tween.onUpdate(function(){
            camera.lookAt(this.x,this.y,this.z);
        })
        tween.start();
    }

    static stop() {
        tween.stop();
    }

    static continue() {
        tween.start();
    }

    static reset() {
        this.stop();
        camera.position.set( 800, 500, 500 );
        controls = new THREE.MapControls(camera, renderer.domElement);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 500000;
        controls.maxPolarAngle = Math.PI * 3 / 4;
        controls.target = new THREE.Vector3(0, 1, -500);
    }
}