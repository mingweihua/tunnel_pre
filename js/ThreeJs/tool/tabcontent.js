


$("#tabcontent1 a").click(function(){
    //console.log($(this).html());
    switch($(this).html()){
        case "白鹭山隧道":
            Model_operation.changeModel(globalModel,"BLSModel");
            break;
        case "西边隧道":
            Model_operation.changeModel(globalModel,"XBModel");
            break;
        case "章庄隧道":
            Model_operation.changeModel(globalModel,"ZZModel");
            break;
        case "杨梅一隧道":
            Model_operation.changeModel(globalModel,"YM1Model");
            break;
        case "杨梅二隧道":
            Model_operation.changeModel(globalModel,"YM2Model");
            break;
        case "严田隧道":
            Model_operation.changeModel(globalModel,"YTModel");
            break;
        case "先锋顶隧道":
            Model_operation.changeModel(globalModel,"XFDModel");
            break;
        case "明月山1号隧道":
            Model_operation.changeModel(globalModel,"MYS1Model");
            break;
        case "明月山2号隧道":
            Model_operation.changeModel(globalModel,"MYS2Model");
            break;
        case "明月山3号隧道":
            Model_operation.changeModel(globalModel.three3dObject,"MYS3Model");
            break;
        case "完整隧道群":
            Model_operation.changeModel(globalModel.three3dObject,"AllModel");
            break;
    }
})

$("#tabcontent3 a").click(function(){
    //console.log($(this).html());
    switch($(this).html()){
        case "数值模拟云图":
            CloudPicture.getCloudModel(globalModel,globalModel.currentName);
            break;
    }
})