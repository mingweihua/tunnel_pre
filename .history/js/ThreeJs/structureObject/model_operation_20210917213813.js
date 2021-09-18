/*
    模型的操作方法，必须要传入模型对象，根据具体方法来进行操作

    这样做的好处是：在新的项目，代码可重用高（因为新的项目开发
    Model里面的模型命名是不一样的

 */
let geoSeparation_h = 0;

class Model_operation {

    static changeModel(object,modelName) {
        scene.remove(object.three3dObject.currentModel);
        scene.remove(object.three3dObject.cloud.currentModel);
        if(object.three3dObject[modelName] != undefined){
            object.three3dObject.currentModel = object.three3dObject[modelName];
            object.currentName = modelName;
            scene.add(object.three3dObject.currentModel);
        } else {
            globalModel.load(modelName_url[modelName].objUrl,modelName_url[modelName].mtlUrl,modelName,1);
        }
    }

    //换上剖切模型的方法
    static sectionModel(object,modelName){
        scene.remove(object.three3dObject.currentModel);
        scene.remove(object.three3dObject.cloud.currentModel);
        scene.remove(object.three3dObject.group_pouqie.currentModel);
        if(object.three3dObject.group_pouqie[modelName] != undefined){
            object.three3dObject.group_pouqie.currentModel = object.three3dObject.group_pouqie[modelName];
            scene.add(object.three3dObject.group_pouqie.currentModel);
        } else {
            globalModel.load(modelName_url[modelName].objUrl,undefined,modelName,1,1);
        }
    }


    static separation(group) {
        for (let i = 1; i <= 9; i++) {
            var mesh;
            if ((mesh= group.getObjectByName("" + i)) != undefined) {
                tween = new TWEEN.Tween(mesh.position)
                    .to({y: i * geoSeparation_h}, 100)
                    .onUpdate(function () {
                        //console.log(this.y);
                    });
                tween.start();
            }

        }
        //控制分离速度
        geoSeparation_h += 10;
    }

    static separation_reset(group){
        geoSeparation_h = 0;
        this.separation(group);
    }

    static showSingleGeo(group,name,isShow){
        group.getObjectByName(name).visible = isShow;
    }


    static chooseElement(group) {
        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector3();

        pointer = new THREE.Vector2();
        window.addEventListener( 'click', onPointerMove,false );

        function onPointerMove( event ) {
            event.preventDefault();
            var intersects = Model_operation.getIntersects(event.offsetX, event.offsetY, group);
            if(intersects.length>0){
                console.log(intersects);

                var geometry = new THREE.SphereGeometry( 1, 50, 50 );
                var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                var sphere = new THREE.Mesh( geometry, material );
                sphere.position.x = intersects[0].point.x;
                sphere.position.y = intersects[0].point.y;
                sphere.position.z = intersects[0].point.z;
                scene.add( sphere );


                //选择对应的mesh后，这里编写你需要实现的逻辑业务



            }

        }
    }

    static getIntersects(x, y, group) {
        x = (x / $('#model_webgl').width()) * 2 - 1;
        y = - (y / $('#model_webgl').height()) * 2 + 1;
        mouseVector.set(x, y, 0.5);
        raycaster.setFromCamera(mouseVector, camera);
        return raycaster.intersectObject(group, true);
    }

    static setScale(group,scale) {
        group.scale.x = scale;
        group.scale.y = scale;
        group.scale.z = scale;
    }

    static setPosition(group,x,y,z) {
        group.position.x = x;
        group.position.y = y;
        group.position.z = z;
    }
}