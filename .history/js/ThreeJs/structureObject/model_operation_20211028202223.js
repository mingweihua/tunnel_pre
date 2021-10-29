/*
    模型的操作方法，必须要传入模型对象，根据具体方法来进行操作

    这样做的好处是：在新的项目，代码可重用高（因为新的项目开发
    Model里面的模型命名是不一样的

 */
let geoSeparation_h = 0;

class Model_operation {

    static stratificationInformation = [];

    static changeModel(object,modelName) {
        scene.remove(object.three3dObject.currentModel);
        scene.remove(object.three3dObject.cloud.currentModel);
        scene.remove(object.three3dObject.group_pouqie.currentModel);
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

    //------------------二维剖切和二维柱状图用到的选点功能----------------------
    static addPointForCutting(event) {
        Model_operation.doAddPointForCutting(globalModel.three3dObject.currentModel,event);
    }

    static doAddPointForCutting(object,event) {
        event.preventDefault();
        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector3();
        pointer = new THREE.Vector2();
        let intersects =  Model_operation.getIntersects(event.offsetX, event.offsetY, object);

        if ( intersects.length > 0 ) {
            //剖切点
            let geometry = new THREE.SphereBufferGeometry(5, 50, 50);
            let material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
            let sphere = new THREE.Mesh(geometry, material);
            sphere.name = "Cutting_Point_" + Model_operation.stratificationInformation.length;
            scene.add(sphere);
            sphere.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);

            //往下创建射线
            let raycaster_vertical = new THREE.Raycaster();
            let origin = new THREE.Vector3(intersects[0].point.x, 1000, intersects[0].point.z);
            let direction = new THREE.Vector3(0,-1,0);
            raycaster_vertical.set(origin, direction);
            //console.log(geoObject);
            let intersects_vertical = raycaster_vertical.intersectObjects(object.children, true);
            if (intersects_vertical.length > 0) {
                Model_operation.stratificationInformation.push(intersects_vertical);
            }
            console.log(Model_operation.stratificationInformation);
        }
    }
    //------------------二维剖切和二维柱状图用到的选点功能----------------------

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

    static chooseElement(group,modelName) {
        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector3();
        pointer = new THREE.Vector2();
        window.addEventListener( 'click', onPointerMove,false );

        function onPointerMove( event ) {
            event.preventDefault();
            var intersects = Model_operation.getIntersects(event.offsetX, event.offsetY, group);
            if(intersects.length>0){
                console.log(intersects);
                let sphere;
                if(scene.getObjectByName("cloudPoint") != undefined){
                    sphere = scene.getObjectByName("cloudPoint");
                } else {
                    let geometry = new THREE.SphereGeometry( 5, 50, 50 );
                    let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                    sphere = new THREE.Mesh( geometry, material );
                    sphere.name = "cloudPoint";
                }
                sphere.position.x = intersects[0].point.x;
                sphere.position.y = intersects[0].point.y;
                sphere.position.z = intersects[0].point.z;
                scene.add( sphere );

                //选择对应的mesh后，这里编写你需要实现的逻辑业务


                let location_json = {};
                //obj中属性坐标
                /*
                 注意！！！
                 注意！！！
                 Three.js中y坐标是高度，但是在数值模拟分析中高度是z坐标
                 因此这边直接在前端处理。
                 */
                location_json.x = intersects[0].point.x;
                //Three.js坐标中的y是高度，因此传数据时定义为z
                location_json.z = intersects[0].point.y;
                //Three.js坐标中的z，在3dmax中是y，并且应该乘以-1
                location_json.y = intersects[0].point.z*-1;
                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/getOneData?modelName=" + modelName,
                    contentType : "application/json;charset=utf-8",//关键是要加上这行
                    traditional : true,//这使json格式的字符不会被转码
                    data : JSON.stringify(location_json),
                    dataType: "json",
                    success: function(data){
                        console.log(data);
                        $("#numericalModal .x").html(location_json.x);
                        $("#numericalModal .y").html(location_json.y);
                        $("#numericalModal .z").html(location_json.z);
                        $("#numericalModal .data").html(data);
                        $('#numericalModal').modal('show');
                        window.removeEventListener( 'click', onPointerMove,false );
                    }
                });
            }
        }
    }

    static deleteChooseElement() {
        if(scene.getObjectByName("cloudPoint") != undefined){
            let mesh = scene.getObjectByName("cloudPoint");
            scene.remove(mesh);
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

    static identifyLayer(group,modelName){
        let name = modelName.split("Model")[0];
        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector3();
        pointer = new THREE.Vector2();
        window.addEventListener( 'click', onPointerClick,false );

        function onPointerClick( event ) {
            event.preventDefault();
            let intersects = Model_operation.getIntersects(event.offsetX, event.offsetY, group);
            if(intersects.length>0){
                let layerName = intersects[0].object.name;
                console.log(layerName);

                let lithology = geoData[name][layerName].lithology;
                let pic = geoData[name][layerName].pic;
                $('#STRATUME').html(lithology);
                $('#legend').attr("src","images/textures/" + pic);
                $('#legendModal').modal('show');
                window.removeEventListener( 'click', onPointerClick,false );
            }
        }
    }

}