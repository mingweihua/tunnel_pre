/*
    模型的操作方法，必须要传入模型对象，根据具体方法来进行操作

    这样做的好处是：在新的项目，代码可重用高（因为新的项目开发
    Model里面的模型命名是不一样的

 */
let geoSeparation_h = 0;

//定义几个画svg要用到的全局变量
var hole_mtx_1 = []; //是总的矩阵信息数组，是三维数组最外围是钻孔数量，内部包含2个数组（钻孔层信息数组和钻孔深度信息数组）
var delt_h = []; //是最高点高度在数组里为0，然后减去对应其他钻孔孔口高度，得到正值
var holes = []; //钻孔信息:钻孔编号，编码，x,y,空口高，总高度
var sectionPoint = []; //存贮组成选点剖切的剖切面三个点

//用例
// hole_mtx_1 = [[[1, 2, 3, 4, 5, 6, 7],
// 			   [0, 1.4, 7.1, 13.8, 19.4, 24.5, 29.5, 52.5]],
// 			[[1, 3, 4, 5, 7, 9],
// 			 [0, 4.1, 6.9, 12.5, 20.8, 25.2, 27]],
// 			[[1,2, 3, 4, 5, 6, 7, 8, 9],
// 			 [0, 0.6, 7, 11.3, 18, 20.9, 28.5, 33.5, 39.4, 50]]]
// delt_h = [1.57,0.37, 0]
// // //钻孔信息，钻孔编号，编码，x,y,空口高，总高度
// holes = [["251200611","J20",495807.0925372,3597078.56811,5.24,52.5],
// 		["251200292","J12",497912.9639804,3594605.6052615,6.44,20],
// 		["251200780","TZZK81",498342.974,3591689.8,6.81,50]]

class Model_operation {

    static stratificationInformation = [];

    static changeModel(object, modelName) {
        scene.remove(object.three3dObject.currentModel);
        scene.remove(object.three3dObject.cloud.currentModel);
        scene.remove(object.three3dObject.group_pouqie.currentModel);
        if (object.three3dObject[modelName] != undefined) {
            object.three3dObject.currentModel = object.three3dObject[modelName];
            object.currentName = modelName;
            scene.add(object.three3dObject.currentModel);
        } else {
            globalModel.load(modelName_url[modelName].objUrl, modelName_url[modelName].mtlUrl, modelName, 1);
        }

        $("#echart1").css({
            "background": "url(/images/textures/" + modelName.split("Model")[0] + ".png) center no-repeat",
            "background-size": "contain"
        });
    }

    //换上剖切模型的方法
    static sectionModel(object, modelName) {
        scene.remove(object.three3dObject.currentModel);
        scene.remove(object.three3dObject.cloud.currentModel);
        scene.remove(object.three3dObject.group_pouqie.currentModel);
        if (object.three3dObject.group_pouqie[modelName] != undefined) {
            object.three3dObject.group_pouqie.currentModel = object.three3dObject.group_pouqie[modelName];
            scene.add(object.three3dObject.group_pouqie.currentModel);
        } else {
            globalModel.load(modelName_url[modelName].objUrl, undefined, modelName, 1, 1);
        }
    }

    //------------------二维剖切和二维柱状图用到的选点功能----------------------
    static addPointForCutting(event) {
        Model_operation.doAddPointForCutting(globalModel.three3dObject.currentModel, event);
    }

    static doAddPointForCutting(object, event) {
        event.preventDefault();
        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector3();
        pointer = new THREE.Vector2();
        let intersects = Model_operation.getIntersects(event.offsetX, event.offsetY, object);

        if (intersects.length > 0) {
            //剖切点
            let geometry = new THREE.SphereBufferGeometry(5, 50, 50);
            let material = new THREE.MeshLambertMaterial({
                color: 0xff0000
            });
            let sphere = new THREE.Mesh(geometry, material);
            sphere.name = "Cutting_Point_" + Model_operation.stratificationInformation.length;
            scene.add(sphere);
            sphere.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);

            //往下创建射线
            let raycaster_vertical = new THREE.Raycaster();
            let origin = new THREE.Vector3(intersects[0].point.x, 1000, intersects[0].point.z);
            let direction = new THREE.Vector3(0, -1, 0);
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
            if ((mesh = group.getObjectByName("" + i)) != undefined) {
                tween = new TWEEN.Tween(mesh.position)
                    .to({
                        y: i * geoSeparation_h
                    }, 100)
                    .onUpdate(function () {
                        //console.log(this.y);
                    });
                tween.start();
            }

        }
        //控制分离速度
        geoSeparation_h += 10;
    }

    //——————————————————二维剖切svg————————————————————————————————————
    static drawSvg() {

        //设置临时数组
        let hole_mtx_first = [];
        let hole_mtx_last = [];


        //第一次循环
        for (let i = 0; i < Model_operation.stratificationInformation.length; i++) {
            //配置delt_h：最高点高度在数组里为0，然后减去对应其他钻孔孔口高度，得到正值
            delt_h.push(Model_operation.stratificationInformation[i][0].point.y);

            //配置holes：钻孔信息:钻孔编号，编码，x,z,孔口高，总高度
            holes[i] = [];
            let x = Model_operation.stratificationInformation[i][0].point.x;
            let y = Model_operation.stratificationInformation[i][0].point.y;
            let z = Model_operation.stratificationInformation[i][0].point.z;

            let a = y - modelName_url[globalModel.currentName].modelBottom;
            holes[i].push("251200622", "Z20", x, z, y, a);

            //配置hole_mtx_1 是总的矩阵信息数组，是三维数组最外围是钻孔数量，内部包含2个数组（钻孔层信息数组和钻孔深度信息数组）
            hole_mtx_1[i] = [];
            hole_mtx_first[i] = [];
            hole_mtx_last[i] = [];

            for (let j = 0; j < Model_operation.stratificationInformation[i].length; j++) {
                if (isNaN(Model_operation.stratificationInformation[i][j].object.name.valueOf()) == false) { //排除holes和tunnels地层

                    let c = Model_operation.stratificationInformation[i][j].object.name.valueOf();
                    let d = y - Model_operation.stratificationInformation[i][j].point.y;
                    hole_mtx_first[i].push(42 - geoData[globalModel.currentName][c].tuli); //将地层信息转化为统一数字序列
                    hole_mtx_last[i].push(d); //将地层信息转化为统一数字序列
                }
            }
            hole_mtx_last[i].push(a); //最后加一个最底层钻孔深度

            hole_mtx_1[i] = [hole_mtx_first[i], hole_mtx_last[i]];
        }

        //第二次循环用来配置delt_h
        for (let i = 0; i < Model_operation.stratificationInformation.length; i++) {
            let a = Math.max(...delt_h);
            let b = a - delt_h[i];
            delt_h.splice(i, 1, b);
        }

        //查看数组
        console.log(hole_mtx_1);
        console.log(delt_h);
        console.log(holes);

    }


    //——————————————————三维任意两点剖切获取剖切面————————————————————————————————————
    static twoPointSection() {
        let point1 = [];
        let point2 = [];
        let point3 = [];

        for (let i = 0; i < Model_operation.stratificationInformation.length; i++) {
            sectionPoint[i] = [];
            //
            delt_h.push(Model_operation.stratificationInformation[i][0].point.y);

            //配置holes：钻孔信息:钻孔编号，编码，x,z,孔口高，总高度
            holes[i] = [];
            let x = Model_operation.stratificationInformation[i][0].point.x;
            let y = Model_operation.stratificationInformation[i][0].point.y;
            let z = Model_operation.stratificationInformation[i][0].point.z;
        }
    }



    //—————————————————————————————————————————————————————————————————
    static separation_reset(group) {
        geoSeparation_h = 0;
        this.separation(group);
    }

    static showSingleGeo(group, name, isShow) {
        group.getObjectByName(name).visible = isShow;
    }

    static chooseElement(group, modelName) {
        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector3();
        pointer = new THREE.Vector2();
        window.addEventListener('click', onPointerMove, false);

        function onPointerMove(event) {
            event.preventDefault();
            var intersects = Model_operation.getIntersects(event.offsetX, event.offsetY, group);
            if (intersects.length > 0) {
                console.log(intersects);
                let sphere;
                if (scene.getObjectByName("cloudPoint") != undefined) {
                    sphere = scene.getObjectByName("cloudPoint");
                } else {
                    let geometry = new THREE.SphereGeometry(5, 50, 50);
                    let material = new THREE.MeshBasicMaterial({
                        color: 0xffff00
                    });
                    sphere = new THREE.Mesh(geometry, material);
                    sphere.name = "cloudPoint";
                }
                sphere.position.x = intersects[0].point.x;
                sphere.position.y = intersects[0].point.y;
                sphere.position.z = intersects[0].point.z;
                scene.add(sphere);

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
                location_json.y = intersects[0].point.z * -1;
                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/getOneData?modelName=" + modelName,
                    contentType: "application/json;charset=utf-8", //关键是要加上这行
                    traditional: true, //这使json格式的字符不会被转码
                    data: JSON.stringify(location_json),
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        $("#numericalModal .x").html(location_json.x);
                        $("#numericalModal .y").html(location_json.y);
                        $("#numericalModal .z").html(location_json.z);
                        $("#numericalModal .data").html(data);
                        $('#numericalModal').modal('show');
                        window.removeEventListener('click', onPointerMove, false);
                    }
                });
            }
        }
    }

    static deleteChooseElement() {
        if (scene.getObjectByName("cloudPoint") != undefined) {
            let mesh = scene.getObjectByName("cloudPoint");
            scene.remove(mesh);
        }
    }

    static getIntersects(x, y, group) {
        x = (x / $('#model_webgl').width()) * 2 - 1;
        y = -(y / $('#model_webgl').height()) * 2 + 1;
        mouseVector.set(x, y, 0.5);
        raycaster.setFromCamera(mouseVector, camera);
        return raycaster.intersectObject(group, true);
    }

    static setScale(group, scale) {
        group.scale.x = scale;
        group.scale.y = scale;
        group.scale.z = scale;
    }

    static setPosition(group, x, y, z) {
        group.position.x = x;
        group.position.y = y;
        group.position.z = z;
    }

    static identifyLayer(group, modelName) {
        let name = modelName;
        //let name = modelName.split("Model")[0];
        raycaster = new THREE.Raycaster();
        mouseVector = new THREE.Vector3();
        pointer = new THREE.Vector2();
        window.addEventListener('click', onPointerClick, false);

        function onPointerClick(event) {
            event.preventDefault();
            let intersects = Model_operation.getIntersects(event.offsetX, event.offsetY, group);
            if (intersects.length > 0) {
                let layerName = intersects[0].object.name;
                console.log(layerName);

                let lithology = geoData[name][layerName].lithology;
                let pic = geoData[name][layerName].pic;
                $('#STRATUME').html(lithology);
                $('#legend').attr("src", "images/textures/" + pic);
                $('#legendModal').modal('show');
                window.removeEventListener('click', onPointerClick, false);
            }
        }
    }


    static geoTransparent(currentModel) {
        let length = currentModel.children.length;
        for (let i = 0; i < length; i++) {
            if (currentModel.children[i].name.indexOf("tunnel") == -1) {
                let material = currentModel.children[i].material;
                material.transparent = true;
                material.opacity = 0.4;
            }
        }
    }

    static geoTransparentReset(currentModel) {
        let length = currentModel.children.length;
        for (let i = 0; i < length; i++) {
            if (currentModel.children[i].name.indexOf("tunnel") == -1) {
                let material = currentModel.children[i].material;
                material.opacity = 1;
                material.transparent = false;
            }
        }
    }

}