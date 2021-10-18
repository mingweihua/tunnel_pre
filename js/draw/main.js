function zuankongMessage(name){
    console.log(name);
    let url = "http://localhost:8080/getZuankongMessage?subwayid=MYS1";
    $('#ZuanKongMessage').bootstrapTable({
        url: url,
        idField: 'holeid',
        showRefresh: true,
        sidePagination: 'client',
        minimumCountColumns: 2,
        detailFormatter: 'detailFormatter',
        pagination: true,
        pageSize: 10,
        pageList: [10,20,50, "all"],
        columns: [
            {field: 'holeid', title: '编号'},
            {field: 'holecode', title: '孔号'},
            {field: 'subwayid', title: '隧道'},
            {field: 'x', title: '坐标x'},
            {field: 'y', title: '坐标y'},
            {field: 'height', title: '孔口高程'},
            {field: 'depth', title: '钻孔深度'},
            {field: 'waterdepth', title: '水位标高'},
        ],
        showExport: true,
        exportDataType: 'all',
        Icons:'glyphicon glyphicon-export', //导出图标
        exportTypes:[ 'excel','doc','csv', 'txt', 'sql' ],
        exportOptions:{
            //ignoreColumn: [0,1,8],  //忽略某一列的索引
            fileName: '数据导出',  //文件名称设置
            worksheetName: 'Sheet1',  //表格工作区名称
            tableName: '数据表',
            excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
        },
        //单击row触发函数
        onClickRow: function (row,element,field) {
            console.log(row);
            /*console.log(element);
            console.log(field);*/
            window.open("zuankonglong.html"+"?holeid="+row.holeid);
        }
    });
    $('#ZuanKongModal').modal('show');
}