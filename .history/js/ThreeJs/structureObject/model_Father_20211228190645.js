class model_Father {
    //constructor是一个构造方法，用来接收参数
    constructor(name) {
        //this代表的是实例对象
        this.name = name;
        //this代表的是实例对象
        this.currentName = "";
        // 存放整个模型；
        this.three3dObject = {
            currentModel: undefined,
            //---以下模型为拼音开头---
            BLSModel: undefined,
            XBModel: undefined,
            ZZModel: undefined,
            XFDModel: undefined,
            YM1Model: undefined,
            YM2Model: undefined,
            YTModel: undefined,
            MYS1Model: undefined,
            MYS2Model: undefined,
            MYS3Model: undefined,
            AllModel: undefined,
            //---以下模型为拼音开头---
            totalModel: undefined,

            cloud: {
                currentModel: undefined,
                BLSModel: undefined,
                XBModel: undefined,
                ZZModel: undefined,
                XFDModel: undefined,
                YM1Model: undefined,
                YM2Model: undefined,
                YTModel: undefined,
                MYS1Model: undefined,
                MYS2Model: undefined,
                MYS3Model: undefined,
            },
            group_pouqie: {
                currentModel: undefined,
                BLSModel: undefined,
                XBModel: undefined,
                ZZModel: undefined,
                XFDModel: undefined,
                YM1Model: undefined,
                YM2Model: undefined,
                YTModel: undefined,
                MYS1Model: undefined,
                MYS2Model: undefined,
                MYS3Model: undefined,
            }

        };
    }

    meshName(ori) {
        if (ori.indexOf("line") == -1) {
            return parseInt(ori);
        } else {
            return ori;
        }
    }


    load(obj_url, mtl_url, keyName, scale,loadPouqie, sectionMathod) {
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
                        thisObject.three3dObject[keyName] = object;
                        thisObject.three3dObject.currentModel = object;

                        // var newObject_pouqie = thisObject.createMaterial_pouqie(result);
                        // thisObject.three3dObject.group_pouqie[keyName] = newObject_pouqie;
                        // thisObject.three3dObject.group_pouqie.currentModel = newObject_pouqie;

                        Model_operation.setScale(object, scale);
                        thisObject.currentName = keyName;
                        currentName = thisObject.currentName;
                        scene.add(thisObject.three3dObject.currentModel);
                    }, onProgress, onError);

            });console.log(currentName);
    }



    // showSingelGroup(group) {
    //     for (var k in this.three3dObject) {
    //         scene.remove(this.three3dObject[k]);
    //     }
    //     scene.add(group);
    // }
}