/**
 * edatagrid - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2011 stworthy [ stworthy@gmail.com ] 
 * 
 * Dependencies:
 *   datagrid
 *   messager
 * 
 */
(function($){
	function clone(myObj){  
	    if(typeof(myObj) != 'object' || myObj == null) return myObj;  
	    var newObj = new Object();  
	    for(var i in myObj){  
	      newObj[i] = clone(myObj[i]); 
	    }  
	    return newObj;  
	}  
	
	function compareTwoObject(obj1,row){console.log(obj1);console.log(row);
		for(var i in row){
			if(obj1[i]&&(obj1[i]!==row[i])){
				console.log("情况1");
				return true;
			}
			if(!obj1[i]&&row[i]!==""){
				console.log("情况2");
				return true;
			}
		}
		return false;
	}
	
	var currTarget;
	$(function(){
		$(document).unbind('.edatagrid').bind('mousedown.edatagrid', function(e){
			var p = $(e.target).closest('div.datagrid-view,div.combo-panel');
			if (p.length){
				if (p.hasClass('datagrid-view')){
					var dg = p.children('table');
					if (dg.length && currTarget != dg[0]){
						_save();
					}
				}
				return;
			}
			_save();
			
			function _save(){
				var dg = $(currTarget);
				if (dg.length){
					dg.edatagrid('saveRow');
					currTarget = undefined;
				}
			}
		});
	});
	
	function buildGrid(target){
		console.log($(target).datagrid.options);
		var opts = $.data(target, 'edatagrid').options;
		console.log(opts);
		$(target).datagrid($.extend({}, opts, {
			onDblClickCell:function(index,field){console.log("双击事件");
				console.log("index   "+index+"   field:   "+field);
				console.log(opts);
				if(opts.editIndex>=0){
					$.messager.alert('系统提示','请撤销或保存后再对其他行进行编辑！');
					return;
				}
				if (opts.editing){		console.log("editing");		console.log(target);console.log(this);	
					$(target).datagrid('unselectAll');
					$(this).edatagrid('editRow', index);
					focusEditor(field);
				}
			},
			onClickCell:function(index,field){
				if(opts.editIndex!=index&&opts.editIndex!=-1){
					$(target).datagrid('uncheckRow',index);
					$.messager.alert('系统提示','请撤销或保存后再点选其他行！',"info",function (){
						$(target).datagrid('unselectRow',index);
					});
					
					return;
				}
				/*if (opts.editing && opts.editIndex >= 0){
					$(this).edatagrid('editRow', index);
					focusEditor(field);
				}*/
			},
			onAfterEdit: function(index, row){console.log('onAfterEdit事件');
				opts.editIndex = -1;
				var url = row.isNewRecord ? opts.saveUrl : opts.updateUrl;console.log("autosave?   "+opts.autoSave);
				if(!opts.autoSave){return;}
				
				if(!row.isNewRecord){
					if(!compareTwoObject(opts.oringinOfTargetedRow,row)){
						$.messager.alert('系统提示','您并没有对该数据进行改动',"info",function(){
							$.messager.progress('close');
							return;
						});	
						return;
					}
				}
				if(row.isNewRecord){
					var isNewRecordEmpty=true;
					for(var i in row){
						console.log(row[i]!=""&& i!=="isNewRecord");					
						if(row[i]!=""&& i!=="isNewRecord"){
							isNewRecordEmpty=false;						
							break;
						}
					}
					if(isNewRecordEmpty){
						$.messager.alert('系统提示','请不要提交空数据。',"info",function(){
							$.messager.progress('close');
							$(target).datagrid('deleteRow', index);
						});	
						return;
					}

				}
				
				if (url){console.log("before post");
					$.post(url, row, function(data){console.log("has post");
						$.messager.progress('close');
						if (data.isError){
							$(target).edatagrid('cancelRow',index);
							$(target).edatagrid('selectRow',index);
							$(target).edatagrid('editRow',index);
							
							$.messager.alert("系统提示",data.errorMsg,"info",function(){
								$(target).datagrid('reload');
							});
							
							opts.onError.call(target, index, data);
							return;
						}
						data.isNewRecord = null; 
						$(target).datagrid('updateRow', {
							index: index,
							row: data
						});
						$.messager.alert("系统提示",data.errorMsg,"info",function(){
							$(target).datagrid('reload');
						});
						if (opts.tree){
							var idValue = row[opts.idField||'id'];
							var t = $(opts.tree);
							var node = t.tree('find', idValue);
							if (node){
								node.text = row[opts.treeTextField];
								t.tree('update', node);
							} else {
								var pnode = t.tree('find', row[opts.treeParentField]);
								t.tree('append', {
									parent: (pnode ? pnode.target : null),
									data: [{id:idValue,text:row[opts.treeTextField]}]
								});
							}
						}						
						opts.onSave.call(target, index, row);
					},'json');
				} else {
					opts.onSave.call(target, index, row);
				}
				if (opts.onAfterEdit) opts.onAfterEdit.call(target, index, row);

				$(target).datagrid('clearSelections');
				/*console.log("on save so reload");
				$(target).datagrid('reload');*/
				opts.autoSave=false;
			},
			onCancelEdit: function(index, row){
				opts.editIndex = -1;
				if (row.isNewRecord) {
					$(this).datagrid('deleteRow', index);
				}
				if (opts.onCancelEdit) opts.onCancelEdit.call(target, index, row);
				$(target).datagrid('clearSelections');
				if (!row.isNewRecord) {
					$(target).datagrid('updateRow', {
						index: index,
						row: opts.oringinOfTargetedRow
					});
				}
				//$(target).datagrid('reload');
			},
			onBeforeLoad: function(param){
				if (opts.onBeforeLoad.call(target, param) == false){return false}
//				$(this).datagrid('rejectChanges');
				$(this).edatagrid('cancelRow');
				if (opts.tree){
					var node = $(opts.tree).tree('getSelected');
					param[opts.treeParentField] = node ? node.id : undefined;
				}
			}
		}));
		
		
		function focusEditor(field){
			var editor = $(target).datagrid('getEditor', {index:opts.editIndex,field:field});
			if (editor){
				editor.target.focus();
			} else {
				var editors = $(target).datagrid('getEditors', opts.editIndex);
				if (editors.length){
					editors[0].target.focus();
				}
			}
		}
		
		if (opts.tree){
			$(opts.tree).tree({
				url: opts.treeUrl,
				onClick: function(node){
					$(target).datagrid('load');
				},
				onDrop: function(dest,source,point){
					var targetId = $(this).tree('getNode', dest).id;
					$.ajax({
						url: opts.treeDndUrl,
						type:'post',
						data:{
							id:source.id,
							targetId:targetId,
							point:point
						},
						dataType:'json',
						success:function(){
							$(target).datagrid('load');
						}
					});
				}
			});
		}
	}
	
	$.fn.edatagrid = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.edatagrid.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.datagrid(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'edatagrid');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'edatagrid', {
					options: $.extend({}, $.fn.edatagrid.defaults, $.fn.edatagrid.parseOptions(this), options)
				});
			}
			buildGrid(this);
		});
	};
	
	$.fn.edatagrid.parseOptions = function(target){
		return $.extend({}, $.fn.datagrid.parseOptions(target), {
		});
	};
	
	$.fn.edatagrid.methods = {
		options: function(jq){
			var opts = $.data(jq[0], 'edatagrid').options;
			return opts;
		},
		enableEditing: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				opts.editing = true;
			});
		},
		disableEditing: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				opts.editing = false;
			});
		},
		editRow: function(jq, index){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				var editIndex = opts.editIndex;
				if (editIndex != index){
					if (dg.datagrid('validateRow', editIndex)){
						if (editIndex>=0){
							if (opts.onBeforeSave.call(this, editIndex) == false) {
								setTimeout(function(){
									dg.datagrid('selectRow', editIndex);
								},0);
								return;
							}
						}
						dg.datagrid('endEdit', editIndex);
						dg.datagrid('beginEdit', index);
						opts.editIndex = index;
						dg.datagrid('selectRow', index);
						if (currTarget != this && $(currTarget).length){
							$(currTarget).edatagrid('saveRow');
							currTarget = undefined;
						}
						if (opts.autoSave){
							currTarget = this;
						}
						opts.oringinOfTargetedRow=clone(dg.datagrid('getSelections')[0]);

						var rows = dg.datagrid('getRows');
						opts.onEdit.call(this, index, rows[index]);
					} else {
						setTimeout(function(){
							dg.datagrid('selectRow', editIndex);
						}, 0);
					}
				}
			});
		},
		addRow: function(jq, index){
			return jq.each(function(){
				var dg = $(this);
				dg.datagrid('clearSelections');
				var opts = $.data(this, 'edatagrid').options;
				
				if(opts.editIndex!=index&&opts.editIndex!=-1){
					$.messager.alert('系统提示','请撤销或保存后再添加新行！',"info");					
					return;
				}
				
				if (opts.editIndex >= 0){
					if (!dg.datagrid('validateRow', opts.editIndex)){
						dg.datagrid('selectRow', opts.editIndex);
						return;
					}
					if (opts.onBeforeSave.call(this, opts.editIndex) == false){
						setTimeout(function(){
							dg.datagrid('selectRow', opts.editIndex);
						},0);
						return;
					}
					dg.datagrid('endEdit', opts.editIndex);
				}
				var rows = dg.datagrid('getRows');
				
				function _add(index, row){
					if (index == undefined){
						dg.datagrid('appendRow', row);
						opts.editIndex = rows.length - 1;
					} else {
						dg.datagrid('insertRow', {index:index,row:row});
						opts.editIndex = index;
					}
				}
				if (typeof index == 'object'){
					_add(index.index, $.extend(index.row, {isNewRecord:true}))
				} else {
					_add(index, {isNewRecord:true});
				}
				
//				if (index == undefined){
//					dg.datagrid('appendRow', {isNewRecord:true});
//					opts.editIndex = rows.length - 1;
//				} else {
//					dg.datagrid('insertRow', {
//						index: index,
//						row: {isNewRecord:true}
//					});
//					opts.editIndex = index;
//				}
				
				dg.datagrid('beginEdit', opts.editIndex);
				dg.datagrid('selectRow', opts.editIndex);
				
				if (opts.tree){
					var node = $(opts.tree).tree('getSelected');
					rows[opts.editIndex][opts.treeParentField] = (node ? node.id : 0);
				}
				
				opts.onAdd.call(this, opts.editIndex, rows[opts.editIndex]);
			});
		},
		saveRow: function(jq){console.log('saveRow');

			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;opts.autoSave=true;
				if (opts.editIndex >= 0){
					$.messager.progress({
						title:"正在处理中……",
						msg:"系统提示"
					}); 
					
					if (opts.onBeforeSave.call(this, opts.editIndex) == false) {
						setTimeout(function(){
							dg.datagrid('selectRow', opts.editIndex);
						},0);
						return;
					}
					$(this).datagrid('endEdit', opts.editIndex);
				}
			});			
		},
		cancelRow: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				if (opts.editIndex >= 0){
					$(this).datagrid('cancelEdit', opts.editIndex);
				}
			});
		},
		destroyRow: function(jq, index){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				console.log(opts.colFieldNameMap);
				var rows = [];
				if (index == undefined){
					rows = dg.datagrid('getSelections');
				} else {
					var rowIndexes = $.isArray(index) ? index : [index];
					for(var i=0; i<rowIndexes.length; i++){
						var row = opts.finder.getRow(this, rowIndexes[i]);
						if (row){
							rows.push(row);
						}
					}
				}
				
				if (!rows.length){
					$.messager.show({
						title: opts.destroyMsg.norecord.title,
						msg: opts.destroyMsg.norecord.msg
					});
					return;
				}
				
				$.messager.confirm(opts.destroyMsg.confirm.title,opts.destroyMsg.confirm.msg,function(r){
					if (r){
						for(var i=0; i<rows.length; i++){
							_del(rows[i]);
						}
						dg.datagrid('clearSelections');
					}
				});
				
				function _del(row){
					var index = dg.datagrid('getRowIndex', row);
					var delMsg="";var currentPoint=0;
					for(var i in opts.colFieldNameMap){
						if(row[i]!==undefined && row[i].length>0){
							delMsg+=opts.colFieldNameMap[i]+" : "+row[i]+", "
							currentPoint++;
							if(currentPoint%2==0){
								delMsg+="<br>";
							}
						}
					}console.log(delMsg);
					if (index == -1){return}
					if (row.isNewRecord){
						dg.datagrid('cancelEdit', index);
					} else {
						if (opts.destroyUrl){
							var idValue = row[opts.idField||'id'];
							$.post(opts.destroyUrl, {id:idValue}, function(data){
								var index = dg.datagrid('getRowIndex', idValue);
								if (data.isError){
									dg.datagrid('selectRow', index);
									opts.onError.call(dg[0], index, data);
									$.messager.alert('系统提示','删除数据<br>'+delMsg+'<br>过程中出现错误。');
									return;
								}
								$.messager.alert('系统提示','删除数据<br>'+delMsg+'<br>成功。');
								if (opts.tree){
									dg.datagrid('reload');
									var t = $(opts.tree);
									var node = t.tree('find', idValue);
									if (node){
										t.tree('remove', node.target);
									}
								} else {
									dg.datagrid('cancelEdit', index);
									dg.datagrid('deleteRow', index);
								}
								opts.onDestroy.call(dg[0], index, row);
							}, 'json');
						} else {
							dg.datagrid('cancelEdit', index);
							dg.datagrid('deleteRow', index);
							opts.onDestroy.call(dg[0], index, row);
						}
					}
				}
			});
		}
	};
	
	$.fn.edatagrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
		editing: true,
		editIndex: -1,
		destroyMsg:{
			norecord:{
				title:'系统提示',
				msg:'您当前没有选择任何数据。'
			},
			confirm:{
				title:'请确认',
				msg:'确定删除当前选择的数据?'
			}
		},
		oringinOfTargetedRow:null,
		colFieldNameMap:null,
//		destroyConfirmTitle: 'Confirm',
//		destroyConfirmMsg: 'Are you sure you want to delete?',
		
		autoSave: false,	// auto save the editing row when click out of datagrid
		url: null,	// return the datagrid data
		saveUrl: null,	// return the added row
		updateUrl: null,	// return the updated row
		destroyUrl: null,	// return {success:true}
		
		tree: null,		// the tree selector
		treeUrl: null,	// return tree data
		treeDndUrl: null,	// to process the drag and drop operation, return {success:true}
		treeTextField: 'name',
		treeParentField: 'parentId',		
		onAdd: function(index, row){},
		onEdit: function(index, row){},
		onBeforeSave: function(index){},
		onSave: function(index, row){},
		onDestroy: function(index, row){},
		onError: function(index, row){		}
	});
})(jQuery);