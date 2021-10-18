/**
 * 
 */
var imgs=['department_prove','id_front','id_rear'];
var dtreesMap={
	NODENAME:"节点显示名称",
	LAYERNAME:"图层服务名称",
	SPECIALTY:"图层专业分类",
	NODETYPE:"节点类型",
	NODECODE:"树节点编码",
	MAPSERVICEURL:"图层地址",
	EITHERSHOWDETAIL:"是否显示要素的详细内容",
	EITHERQUERYPROPERTIES:"是否要进行属性查询",
	LAYERVISIBLE:"图层是否可见",
	SERVICETYPE:"服务类型",
	LAYERTYPE:"图层要素类型",
	STRATIFICATION:"分层信息",
	FATHERLAYER:"图层服务的地址",
	MEDIAFIELD:"与多媒体文件关联字段"	
};
var outcomeMap={
	fileName:"文件名",
	introduction:"简介",
	parentFolder:"所属类别",
	uploadUser:"上传者",	
};

var fieldConfigMap={
	fieldName:"字段名",
	layerName:"图层服务名称",
	showName:"字段展示名",
	specialty:"图层专业分类",	
};

var userMap={
	userName:"用户名",
	password:"密码",
	name:"姓名",
	department:"所属单位",	
	mobile:"联系电话",
	userId:"用户编号",
	userDescription:"备注",	
};

var fileMap={
	createTime:"上传时间",
	creator:"上传者",
	fileExtenType:"文件类型",
	extendType:"文件类型",
	name:"文件名",
	fileName:"文件名",
	size:"文件字节",
	fileSize:"文件字节",
	userName:"用户名",
	department:"用户单位",
	realName:"姓名",
	newName:"文件名",
}

var tradeMap={
	address:"地址",
	department:"用户单位",
	email:"电子邮件",
	idcard:"地址",
	mobile:"手机号码",
	name:"姓名",
	phone:"联系电话",
	sqlcn:"查询条件",
	tablecn:"表中文名",
	tableen:"表英文名",
	userid:"用户编号"
}

function detailDialog(index,value,row){
	
	console.log(index);

	console.log( $("#dg").datagrid('getData'));
	var selectedRows = $("#dg").datagrid('getData').rows[index];
	console.log(selectedRows);
	console.log(selectedRows.content)
	//var rowObj=JSON.parse(selectedRows.content);
	
	$('#content_grid').empty();
	$('#div_left').empty();
	$('#div_right').empty();//console.log(obj);
	if(selectedRows.module){
		switch (selectedRows.module){
			case "数据管理":
				manageContent_Data(selectedRows);
				break;
			case "目录树字段配置":
				manageContent_FieldConfig(selectedRows);
				break;
			case "数据交易管理":
				manageContent_Trade(selectedRows);
				break;
			case "目录树管理":
				manageContent_Dtree(selectedRows);
				break;
			case "数据还原":
				manageContent_Backup(selectedRows);
				break;
			case "图层菜单管理":
				manageContent_DtreeMenu(selectedRows);
				break;
			case "数据表管理":
				manageContent_Table(selectedRows);
				break;
			case "用户注册":
				manageContent_UserRegister(selectedRows);
				break;
			case "注册管理":
				manageContent_Register(selectedRows);
				break;
			case "文件管理":
				manageContent_File(selectedRows);
				break;
			case "用户管理":
				manageContent_User(selectedRows);
				break;
			case "成果文件管理":
				manageContent_Outcome(selectedRows);
				break;
			default:
				manageContent_Default(selectedRows);				
				break;
		}
	}
	
}

function addContentToGrid(obj,divId){
	//$('#content_grid').empty();
	if(!obj){return;}
	for(var i in obj){
		$('#'+divId).append('	<div class="line">'+
				'<div class="left">'+obj[i]+'</div>'+
				'<div class="right">'+i+'</div></div>');
	}
}

function addOneLineToGrid(left,right,divId){
	//$('#content_grid').empty();
		$('#'+divId).append('	<div class="line">'+
				'<div class="left">'+left+'</div>'+
				'<div class="right">'+right+'</div></div>');
	
}

function manageContent_Data(obj){
	// $('#content_grid').empty();
	// $('#div_left').empty();
	// $('#div_right').empty();console.log(obj);
	
	var operation=obj.operation;//console.log("hello");console.log(obj);
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "删除":
			addContentToGrid(contObj.CNObj,"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "添加":
			addContentToGrid(contObj,"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "修改":
			addContentToGrid(contObj.oldData,"div_left");
			addContentToGrid(contObj.newData,"div_right");
			$('#contentDlg_2').dialog('open');
			break;
		case "批量导入":
			$.messager.confirm('系统提示', '是否下载导入文件？', function(r){
                if (r){
                  location.href="download.htm?type=upload&file="+contObj.FileName;
                }
            });
			break;
		default:
			break;
	}
}

function manageContent_FieldConfig(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "删除字段配置":
			var  idx=0;
			for(var i=0;i<contObj.data.length;i++){
				addOneLineToGrid("<hr>","<hr>","content_grid");
				addContentToGrid(getCNObj_trim(contObj.data[i],fieldConfigMap),"content_grid");
			}			
			$('#contentDlg').dialog('open');
			break;
		case "添加字段配置":
			addContentToGrid(getCNObj_trim(contObj.data,fieldConfigMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "修改字段配置":
			addContentToGrid(getCNObj_trim(contObj.oldData,fieldConfigMap),"div_left");
			addContentToGrid(getCNObj_trim(contObj.newData,fieldConfigMap),"div_right");
			$('#contentDlg_2').dialog('open');
			break;
		default:
			break;
	}
}

function manageContent_Trade(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "申请数据":
			addContentToGrid(getCNObj_trim(contObj,tradeMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "拒绝申请":
			if(contObj.allData){					
				for(var i=0;i<contObj.allData.length;i++){
					addContentToGrid(getCNObj_trim(contObj.allData[i],tradeMap),"content_grid");
					addOneLineToGrid("<hr>","<hr>","content_grid");
				}		
			}
			//addContentToGrid(getCNObj(contObj.param,tradeMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "同意申请":
			if(contObj.allData){					
				for(var i=0;i<contObj.allData.length;i++){
					addContentToGrid(getCNObj_trim(contObj.allData[i],tradeMap),"content_grid");
					addOneLineToGrid("<hr>","<hr>","content_grid");
				}		
			}
			//addContentToGrid(getCNObj(contObj.param,tradeMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		default:
			break;
	}
}

function manageContent_Dtree(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "删除":
			addContentToGrid(getCNObj(contObj.oriData[0],dtreesMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "添加":
			addContentToGrid(getCNObj(contObj.param,dtreesMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "修改":
			addContentToGrid(getCNObj(contObj.oriData[0],dtreesMap),"div_left");
			addContentToGrid(getCNObj(contObj.param,dtreesMap),"div_right");
			$('#contentDlg_2').dialog('open');
			break;
		default:
			break;
	}
}

function manageContent_Backup(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "外部上传":
			if(contObj.tables){
				var names=getNamesCn(contObj.tables);console.log(names);
				//addContentToGrid(getCNObj_trim(contObj.file,fileMap),"content_grid");
				//addOneLineToGrid("<hr>","<hr>","content_grid");
					$.ajax({
						type: "post",
						url: '../table/getTableName.htm',
						//data:{fileName:file.name},    
						data:{menuIds:contObj.tables},    
						dataType: "json",//后台处理后返回的数据格式
						success: function (data) {
							console.log(data);
							for(var i=0;i<data.names.length;i++){
								addOneLineToGrid(data.names[i],"表 "+(i+1),"content_grid");			
							}		
							$('#contentDlg').dialog('open');
						}
					})

			}			
			
			break;
		case "现有文件还原":
			if(contObj.tables){
				var names=getNamesCn(contObj.tables);console.log(names);
					$.ajax({
						type: "post",
						url: '../table/getTableName.htm',
						//data:{fileName:file.name},    
						data:{menuIds:contObj.tables},    
						dataType: "json",//后台处理后返回的数据格式
						success: function (data) {
							console.log(data);
							for(var i=0;i<data.names.length;i++){
								addOneLineToGrid(data.names[i],"表 "+(i+1),"content_grid");			
							}		
							$('#contentDlg').dialog('open');
						}
					})
			}			
			//$('#contentDlg').dialog('open');
			break;
		default:
			break;
	}
}

function manageContent_DtreeMenu(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "删除图层":
			addContentToGrid(getCNObj_UP(contObj.deleteTree,dtreesMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "添加图层":
			addContentToGrid(getCNObj_UP(contObj.NewData,dtreesMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "修改图层":
			addContentToGrid(getCNObj_UP(contObj.oldTree[0],dtreesMap),"div_left");
			addContentToGrid(getCNObj_UP(contObj.newTree,dtreesMap),"div_right");
			$('#contentDlg_2').dialog('open');
			break;
		default:
			break;
	}
}

function manageContent_Table(obj){	
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	var a={};
	a["表中文名"]=contObj.nameCN?contObj.nameCN:"";
	a["表英文名"]=contObj.nameEN?contObj.nameEN:"";
	a["专题名称"]=contObj.specialty?contObj.specialty:"";
	
	switch (operation){
		case "删除数据表":
			addContentToGrid(a,"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "添加数据表":
			addOneLineToGrid(" "," ","content_grid");
			
			//a["字段"]="字段展示名";
			addOneLineToGrid(" "," ","content_grid");
			addContentToGrid(a,"content_grid");
			addOneLineToGrid("字段展示名","字段","content_grid");
			addContentToGrid(contObj.map,"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "修改数据表":
			
			
			if(!contObj.origindaArr || contObj.origindaArr.length==0){return;}
			var head1=contObj.origindaArr[0];
			delete(head1['id']);
						
			addContentToGrid(head1,"div_left");			
			addContentToGrid(a,"div_right");			
			
			addOneLineToGrid(" "," ","div_left");
			addOneLineToGrid("字段展示名","字段","div_left");
			addOneLineToGrid(" "," ","div_left");
			
			addOneLineToGrid(" "," ","div_right");
			addOneLineToGrid("字段展示名","字段","div_right");
			addOneLineToGrid(" "," ","div_right");
			
			addContentToGrid(head1,"div_left");			
			addContentToGrid(a,"div_right");		
			
			addContentToGrid(contObj.originData,"div_left");			
			addContentToGrid(contObj.map,"div_right");	
			$('#contentDlg_2').dialog('open');
			break;
		default:
			break;
	}
}

function manageContent_UserRegister(obj){
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	userDlgClean();	
	$("#regisfm").form("load",contObj);
	for(var i=0;i<imgs.length;i++){
		var imgStr="<a href='.."+contObj[imgs[i]]+"' target='_blank'><img style='height:100%;width:100%' src='"+contObj[imgs[i]]+"'/></a>";
		$('#'+imgs[i]+"_content").append(imgStr);
	}
	$("#userDlg").dialog("open");
	
}

function manageContent_Register(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	userDlgClean();	
	$("#regisfm").form("load",contObj);
	for(var i=0;i<imgs.length;i++){
		if(contObj[imgs[i]]){
			var imgStr="<a href='.."+contObj[imgs[i]]+"' target='_blank'><img style='height:100%;width:100%' src='"+contObj[imgs[i]]+"'/></a>";
			$('#'+imgs[i]+"_content").append(imgStr);
		}

	}
	$("#userDlg").dialog("open");
	
/*	switch (operation){
		case "注册通过":
			
			break;
		case "注册不通过":
		
			break;
		default:
			break;
	}*/
}

function manageContent_File(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "文件上传":
			addContentToGrid(getCNObj_trim(contObj,fileMap),"content_grid");
			$('#contentDlg').dialog('open');			
			break;
		case "文件删除":
			addContentToGrid(getCNObj_trim(contObj,fileMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "文件夹删除":
			addContentToGrid(getCNObj_trim(contObj.file,fileMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;			
		case "文件重命名":
			addContentToGrid(getCNObj_trim(contObj.oldFile,fileMap),"div_left");
			contObj.oldFile["name"]=contObj.newName;
			addContentToGrid(getCNObj_trim(contObj.oldFile,fileMap),"div_right");
			$('#contentDlg_2').dialog('open');
			break;			
		case "文件夹重命名":
			addContentToGrid(getCNObj_trim(contObj.oldFolder,fileMap),"div_right");
			addContentToGrid(getCNObj_trim(contObj,fileMap),"div_left");					
			$('#contentDlg_2').dialog('open');
			break;			
		case "新建文件夹":
			var a={};
			if(contObj.user){
				a.realName=contObj.user.name;
				a.department=contObj.user.department;
				a.userName=contObj.user.userName;
			}
			a.name=contObj.name;
			addContentToGrid(getCNObj_trim(a,fileMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;		
		case "文件授权":
			addContentToGrid(getCNObj_trim(contObj.file,fileMap),"content_grid");
			addOneLineToGrid("<hr>","<hr>","content_grid");
			if(contObj.users){					
				for(var i=0;i<contObj.users.length;i++){
					addContentToGrid(getCNObj_trim(contObj.users[i],fileMap),"content_grid");
					addOneLineToGrid("<hr>","<hr>","content_grid");
				}		
			}
			$('#contentDlg').dialog('open');
			break;		
		case "文件下载":
			addContentToGrid(getCNObj_trim(contObj.file,fileMap),"content_grid");
			addOneLineToGrid("<hr>","<hr>","content_grid");
			addContentToGrid(getCNObj_trim(contObj.user,fileMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;		
		default:
			break;
	}
}

function manageContent_User(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "添加用户":
			addContentToGrid(getCNObj_trim(contObj.newUser,userMap),"content_grid");

			$('#contentDlg').dialog('open');			
			break;
		case "删除用户":
			addContentToGrid(getCNObj_trim(contObj,userMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "修改用户信息":
			addContentToGrid(getCNObj_trim(contObj.oldUser,userMap),"div_left");
			addContentToGrid(getCNObj_trim(contObj.newUser,userMap),"div_right");
			$('#contentDlg_2').dialog('open');
			break;			
		case "用户授权":
			console.log(contObj);
			
			addContentToGrid(getCNObj_trim(contObj.user,userMap),"content_grid");
			//addContentToGrid(getCNObj_trim(contObj.user,userMap),"div_right");
			addOneLineToGrid("<hr>","<hr>","content_grid");
			//addOneLineToGrid("<hr>","<hr>","div_right");
			
			for(var i=0;i<contObj.content.newSde.length;i++){
				addOneLineToGrid(contObj.content.newSde[i],"空间数据图层","content_grid");
			}
			addOneLineToGrid("<hr>","<hr>","content_grid");
			for(var i=0;i<contObj.content.newTable.length;i++){
				addOneLineToGrid(contObj.content.newTable[i],"数据表","content_grid");
			}			

			$('#contentDlg').dialog('open');
			break;			
		default:
			break;
	}
}

function manageContent_Outcome(obj){
	if(!obj.operation){return;}
	var operation=obj.operation;
	if(!obj.content){return;}
	var contObj=JSON.parse(obj.content);console.log(contObj);
	
	switch (operation){
		case "文件上传":
			addContentToGrid(getCNObj_trim(contObj.file,outcomeMap),"content_grid");
			$('#contentDlg').dialog('open');			
			break;
		case "文件删除":
			addContentToGrid(getCNObj_trim(contObj.file,outcomeMap),"content_grid");
			$('#contentDlg').dialog('open');
			break;
		case "文件修改":
			addContentToGrid(getCNObj_trim(contObj.oldFile,outcomeMap),"div_left");
			addContentToGrid(getCNObj_trim(contObj.newFile,outcomeMap),"div_right");
			$('#contentDlg_2').dialog('open');
			break;			
		default:
			break;
	}
}

function manageContent_Default(obj){
	
}

function userDlgClean(){
	$("#regisfm").form('clear');
	for(var i=0;i<imgs.length;i++){
		$('#'+imgs[i]+"_content").html('');
	}
}

function getCNObj(obj,CNOBJ){
	var a={};
	for(var i in obj){
		if(CNOBJ[i]){
			a[CNOBJ[i]]=obj[i];
		}else{
			a[i]=obj[i];
		}
	}
	delete(a['SPECIFICROWID']);
	return a;
}

function getCNObj_trim(obj,CNOBJ){
	var a={};
	for(var i in obj){
		if(CNOBJ[i]){
			a[CNOBJ[i]]=obj[i];
		}
	}
	delete(a['SPECIFICROWID']);
	return a;
}


function getCNObj_UP(obj,CNOBJ){
	var a={};
	for(var i in obj){
		if(CNOBJ[i.toUpperCase()]){
			a[CNOBJ[i.toUpperCase()]]=obj[i];
		}else{
			a[i]=obj[i];
		}
	}
	delete(a['SPECIFICROWID']);
	return a;
}

function getNamesCn(ids){
	$.ajax({
		type: "post",
		url: '../table/getTableName.htm',
		//data:{fileName:file.name},    
		data:{menuIds:ids},    
		dataType: "json",//后台处理后返回的数据格式
		success: function (data) {
			console.log(data);
			return data.names;
		}
	})
}

	