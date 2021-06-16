class model_Father {
    //constructor是一个构造方法，用来接收参数
    constructor(name, scale, y) {
        //this代表的是实例对象
        this.name = name;
        // 存放模型需要调整大小参数后在Three世界坐标中显示
        this.scale = scale;
        // 存放模型需要调整位置参数后在Three世界坐标中显示
        this.coordinateOffset = y || 0;

        // 存放整个模型；
        this.three3dObject = {
            totalModel : undefined,
            cloudModel : undefined,
        };
    }

    meshName(ori) {
        if (ori.indexOf("line") == -1) {
            return parseInt(ori);
        } else {
            return ori;
        }
    }

    setScaleAndOffset(group) {
        group.scale.x = this.scale;
        group.scale.y = this.scale;
        group.scale.z = this.scale;
        group.position.y = this.coordinateOffset;
    }


    load(obj_url, mtl_url, keyName) {
        var thisObject = this;
        const onProgress = function (xhr) {

            if (xhr.lengthComputable) {

                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');

            }

        };

        const onError = function () {};

        const manager = new THREE.LoadingManager();
        manager.addHandler(/\.dds$/i, new THREE.DDSLoader());

        new THREE.MTLLoader(manager)
            .load(mtl_url, function (materials) {

                materials.preload();

                new THREE.OBJLoader(manager)
                    .setMaterials(materials)
                    .load(obj_url, function (object) {

                        // object.position.y = - 95;
                        thisObject.three3dObject[keyName] = object;
                        thisObject.setScaleAndOffset(thisObject.three3dObject[keyName]);
                        scene.add(thisObject.three3dObject[keyName]);
                    }, onProgress, onError);

            });
    }


    getIntersects(x, y, group) {


        x = (x / $('#model_webgl').width()) * 2 - 1;
        y = - (y / $('#model_webgl').height()) * 2 + 1;
        mouseVector.set(x, y, 0.5);
        raycaster.setFromCamera(mouseVector, camera);

        return raycaster.intersectObject(group, true);
    }


    showSingelGroup(group) {
        for (var k in this.three3dObject) {
            scene.remove(this.three3dObject[k]);
        }
        scene.add(group);
    }
}