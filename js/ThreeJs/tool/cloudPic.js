class CloudPicture {


    static hasCloudPicture(model){
        if (!model.hasCloudPicture){
            alert("该模型不含有云图");
        }
    }

    static getCloudModel(object,modelName){
        scene.remove(object.three3dObject.currentModel);
        if(object.three3dObject.cloud[modelName] != undefined){
            scene.remove(object.three3dObject.cloud[modelName]);
        } else {
            this.getAllData(object.three3dObject.currentModel,modelName)
        }
    }

    static  getAllData(group,modelName){
        let modelSpaceData = [];
        for (let i = 0; i < group.children.length; i++) {
            let positionArr = {
                location:[],
            };
            var size = group.children[i].geometry.attributes.position.count;
            for (let j = 0; j < size; j++) {
                let location_json = {};
                //obj中属性坐标
                /*
                 注意！！！
                 注意！！！
                 Three.js中y坐标是高度，但是在数值模拟分析中高度是z坐标
                 因此这边直接在前端处理。
                 */
                location_json.x = (group.children[i].geometry.attributes.position.array[j*3+0]);
                //Three.js坐标中的y是高度，因此传数据时定义为z
                location_json.z = (group.children[i].geometry.attributes.position.array[j*3+1]);
                //Three.js坐标中的z，在3dmax中是y，并且应该乘以-1
                location_json.y = (group.children[i].geometry.attributes.position.array[j*3+2]*-1);
                positionArr.location.push(location_json);
            }
            modelSpaceData.push(positionArr);
        }
        //console.log(modelSpaceData);

        globalModel.three3dObject.cloud[modelName] = new THREE.Group();

        $.ajax({
            type: "post",
            url: "http://localhost:8080/getAllData?modelName=" + modelName,
            contentType : "application/json;charset=utf-8",//关键是要加上这行
            traditional : true,//这使json格式的字符不会被转码
            data : JSON.stringify(modelSpaceData),
            dataType: "json",
            success: function(data){
                console.log(data);


                for (let i = 0; i < group.children.length; i++) {

                    let mesh = new THREE.Mesh( undefined, new THREE.MeshLambertMaterial( {
                        side: THREE.DoubleSide,
                        color: 0xF5F5F5,
                        vertexColors: true
                    } ) );

                    mesh.geometry = group.children[i].geometry;
                    let values = data[i].numericalDatas;
                    lut.setMax( 325);
                    lut.setMin( 0);

                    // default color attribute
                    const colors = [];

                    for ( let i = 0, n = mesh.geometry.attributes.position.count; i < n; ++ i ) {

                        colors.push( 1, 1, 1 );

                    }

                    mesh.geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
                    globalModel.three3dObject.cloud[modelName].add(mesh);

                    updateColors();

                    scene.add( globalModel.three3dObject.cloud[modelName]);
                    render();


                    function updateColors() {

                        const geometry = mesh.geometry;
                        //const pressures = geometry.attributes.pressure;
                        const colors = geometry.attributes.color;

                        for ( let i = 0; i < values.length; i ++ ) {

                            const colorValue = (values[ i ]);

                            const color = lut.getColor( colorValue );

                            if ( color === undefined ) {

                                console.log( 'Unable to determine color for value:', colorValue );

                            } else {

                                colors.setXYZ( i, color.r, color.g, color.b );

                            }

                        }

                        colors.needsUpdate = true;

                        /*const map = sprite.material.map;
                        lut.updateCanvas( map.image );
                        map.needsUpdate = true;*/

                    }
                }
            }
        });
    }
}