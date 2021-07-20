


$("#tabcontent1 a").click(function(){
    //console.log($(this).html());
    switch($(this).html()){
        case "白鹭山隧道":
            Model_operation.changeModel(globalModel.three3dObject,"BLSModel");
            break;
        case "西边隧道":
            Model_operation.changeModel(globalModel.three3dObject,"XBModel");
            break;
        case "章庄隧道":
            Model_operation.changeModel(globalModel.three3dObject,"ZZModel");
            break;
        case "杨梅一隧道":
            Model_operation.changeModel(globalModel.three3dObject,"YM1Model");
            break;
        case "杨梅二隧道":
            Model_operation.changeModel(globalModel.three3dObject,"YM2Model");
            break;
        case "严田隧道":
            Model_operation.changeModel(globalModel.three3dObject,"YTModel");
            break;
        case "先锋顶隧道":
            Model_operation.changeModel(globalModel.three3dObject,"XFDModel");
            break;
        case "明月山1号隧道":
            Model_operation.changeModel(globalModel.three3dObject,"MYS1Model");
            break;
        case "明月山2号隧道":
            Model_operation.changeModel(globalModel.three3dObject,"MYS2Model");
            break;
        case "明月山3号隧道":
            Model_operation.changeModel(globalModel.three3dObject,"MYS3Model");
            break;
    }
})