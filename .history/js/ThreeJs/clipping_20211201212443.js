
//设置newPlane为任意选点组成的剖面
var newPlane = new THREE.Plane();

var planes = [
    // new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1000),
    // new THREE.Plane(new THREE.Vector3(0, -1, 0), 1000),
    // new THREE.Plane(new THREE.Vector3(0, 0, -1), 1000),
    // new THREE.Plane().setFromCoplanarPoints(new THREE.Vector3(2,3,4),new THREE.Vector3(2,4,4),new THREE.Vector3(2,3,6))
];
var planeHelpers;

planeHelpers = planes.map(p => new THREE.PlaneHelper(p, 1000, 0xffffff));
planeHelpers.forEach(ph => {

    ph.visible = false;
    scene.add(ph);

});

function createPlaneStencilGroup(geometry, plane, renderOrder) {

    var group = new THREE.Group();
    var baseMat = new THREE.MeshBasicMaterial();
    baseMat.depthWrite = false;
    baseMat.depthTest = false;
    baseMat.colorWrite = false;
    baseMat.stencilWrite = true;
    baseMat.stencilFunc = THREE.AlwaysStencilFunc;

    // back faces
    var mat0 = baseMat.clone();
    mat0.side = THREE.BackSide;
    mat0.clippingPlanes = [plane];
    mat0.stencilFail = THREE.IncrementWrapStencilOp;
    mat0.stencilZFail = THREE.IncrementWrapStencilOp;
    mat0.stencilZPass = THREE.IncrementWrapStencilOp;

    var mesh0 = new THREE.Mesh(geometry, mat0);
    mesh0.renderOrder = renderOrder;
    group.add(mesh0);

    // front faces
    var mat1 = baseMat.clone();
    mat1.side = THREE.FrontSide;
    mat1.clippingPlanes = [plane];
    mat1.stencilFail = THREE.DecrementWrapStencilOp;
    mat1.stencilZFail = THREE.DecrementWrapStencilOp;
    mat1.stencilZPass = THREE.DecrementWrapStencilOp;

    var mesh1 = new THREE.Mesh(geometry, mat1);
    mesh1.renderOrder = renderOrder;

    group.add(mesh1);

    return group;

}

/*function controlGUI(value){
    if(value=="显示剖切面板"){
        console.log(material);
        $("#gui").show();
        $("#pouqieMB").html("隐藏剖切面板");
        Model_operation.sectionModel(globalModel,currentName);
        console.log(globalModel.three3dObject.group_pouqie.currentModel);
        
    } else {
        $("#gui").hide();
        $("#pouqieMB").html("显示剖切面板");
        Model_operation.changeModel(globalModel,currentName);
        
    }
}*/
