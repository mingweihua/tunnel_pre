$("#tabcontent1 a").click(function () {
    //console.log($(this).html());
    $("#subwayName").html($(this).html());
    switch ($(this).html()) {

        case "切换纵剖模型":
            $(this).html("恢复原模型");
            Model_operation.changeModel(globalModel, currentName+"_Sec");
            break;
        case "恢复原模型":
            $(this).html("切换纵剖模型");
            Model_operation.changeModel(globalModel, currentName.substring(0,currentName.length-5));
            break;

        case "白鹭山隧道":
            Model_operation.changeModel(globalModel, "BLSModel");
            break;
        case "西边隧道":
            Model_operation.changeModel(globalModel, "XBModel");
            break;
        case "章庄隧道":
            Model_operation.changeModel(globalModel, "ZZModel");
            break;
        case "杨梅一隧道":
            Model_operation.changeModel(globalModel, "YM1Model");
            break;
        case "杨梅二隧道":
            Model_operation.changeModel(globalModel, "YM2Model");
            break;
        case "严田隧道":
            Model_operation.changeModel(globalModel, "YTModel");
            break;
        case "先锋顶隧道":
            Model_operation.changeModel(globalModel, "XFDModel");
            break;
        case "明月山1号隧道":
            Model_operation.changeModel(globalModel, "MYS1Model");
            break;
        case "明月山2号隧道":
            Model_operation.changeModel(globalModel, "MYS2Model");
            break;
        case "明月山3号隧道":
            Model_operation.changeModel(globalModel, "MYS3Model");
            break;
        case "完整隧道群":
            Model_operation.changeModel(globalModel, "AllModel");
            break;
    }
})

$("#tabcontent2 a").click(function () {
    //console.log($(this).html());
    switch ($(this).html()) {
        case "地层分离":
            geoSeparation_h += 10;
            Model_operation.separation(globalModel.three3dObject.currentModel);
            break;
        case "地层合并":
            Model_operation.separation_reset(globalModel.three3dObject.currentModel);
            break;
        case "地层识别":
            Model_operation.identifyLayer(globalModel.three3dObject.currentModel, globalModel.currentName);
            break;
        case "显示剖切面板":
            console.log(material);
            $(this).html("隐藏剖切面板");
            $("#gui").show();
            Model_operation.sectionModel(globalModel, globalModel.currentName,"arb");
            console.log(globalModel.three3dObject.group_pouqie.currentModel);
            break;
        case "隐藏剖切面板":
            $(this).html("显示剖切面板");
            $("#gui").hide();
            Model_operation.changeModel(globalModel, globalModel.currentName);
            break;
        case "选点":
            window.addEventListener("click", Model_operation.addPointForCutting, false);
            break;
        case "选点重置":
            Model_operation.addPointReset();
            window.removeEventListener("click", Model_operation.addPointForCutting, false);
            break;
        case "二维剖切":
            Model_operation.drawSvg();
            window.open("./svg.html");
            window.removeEventListener("click", Model_operation.addPointForCutting, false);
            // drawSvg1();
            break;
        case "三维选点剖切":
            Model_operation.twoPointSection();
            window.removeEventListener("click", Model_operation.addPointForCutting, false);
            break;
        case "井字剖切":
            Model_operation.wellSection();
            window.removeEventListener("click", Model_operation.addPointForCutting, false);
            break;
        case "钻孔柱状图":
            zuankongMessage(globalModel.currentName);
            break;
        case "地层透明化":
            Model_operation.geoTransparent(globalModel.three3dObject.currentModel);
            break;
        case "地层复原":
            Model_operation.geoTransparentReset(globalModel.three3dObject.currentModel);
            Model_operation.separation_reset(globalModel.three3dObject.currentModel);
            break;
        case "隧道漫游":
            $(this).html("暂停漫游");
            GeoRoam.start(globalModel);
            break;
        case "暂停漫游":
            $(this).html("继续漫游");
            GeoRoam.stop();
            break;
        case "继续漫游":
            $(this).html("暂停漫游");
            GeoRoam.continue(globalModel);
            break;
        case "漫游重置":
            ;
            $("#roam").html("隧道漫游");
            GeoRoam.reset(globalModel);
            break;
    }
})

$("#tabcontent3 a").click(function () {
    switch ($(this).html()) {
        case "数值模拟云图":
            CloudPicture.getCloudModel(globalModel, globalModel.currentName);
            break;
        case "模型重置":
            CloudPicture.removeCloudModel(globalModel);
            break;
        case "离散元分析":
            PFC_function.showPFC(globalModel, "in", 'pfcChart', 'PFCModal');
            break;
        case "选点分析":
            Model_operation.chooseElement(globalModel.three3dObject.currentModel, globalModel.currentName);
            break;
        case "选点取消":
            Model_operation.deleteChooseElement();
            break;
    }
})

$("#tabcontent4 a").click(function () {
    switch ($(this).html()) {
        case "隧道入口平面分析":
            PFC_function.showPFC(globalModel, 'in', 'nn_in_Chart', 'nn_in_Modal');
            break;
        case "隧道出口平面分析":
            PFC_function.showPFC(globalModel, 'out', 'nn_out_Chart', 'nn_out_Modal');
            break;
    }
})