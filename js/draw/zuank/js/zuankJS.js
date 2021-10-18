var totalImg=[];
var o;
var o2;
var YS;
var s;
var targetID;
var count=0;
var stringHoleUrl = window.location.href.split("?")[1];
var GetEGHOLEUrl = window.location.origin+"/taizhou/zuanKongGetEGHOLE?"+stringHoleUrl;
var GetEGHOLELayerUrl = window.location.origin+"/taizhou/zuanKongGetEGHOLELayer?"+stringHoleUrl;
var GetEgstdpenetrationUrl = window.location.origin+"/taizhou/getEgstdpenetration?"+stringHoleUrl;




function changeImage(id,url){
			//console.log(url);
				document.getElementById(id).style.backgroundImage=url;
}
				
window.onload  =function(){
	 
	//var urlinfo = window.location.href;          //获取url
	// s = urlinfo.split("?")[1].split("=")[1].split('#')[0]; //拆分url得到“=”号后面的值（先用split("?")[1]得到？号以后的值，再用split("=")[1]得到等号后面的值，split从0开始计数）

	$(function(){
		
		if(window.location.search.indexOf("virtual")>=0){
			//虚拟钻孔
			$.ajax({
				async: false,
				url: window.location.origin+"/taizhou/getVirtualZZTEgholeData",
				type: "post",
				success: function (data) {
					console.log(data);
					var aa1 = data;
					var aa2;
					$.ajax({
						async: false,
						url: window.location.origin+"/taizhou/getVirtualZZTEgholelayerData",
						type: "post",
						success: function (data2) {
							aa2 = data2;
							console.log(aa2);
						}
					});
					o=aa1;
					o2=aa2;	
			       huaTu();
			       
				   for(var y=1;y<=YS;y++){
				   //------表头--------	
					document.getElementById("ZKBHA"+y).innerHTML="ZK"+o[0].holeid;
					document.getElementById("XZBA"+y).innerHTML="x="+o[0].x+"m";				
					document.getElementById("ZKBGA"+y).innerHTML=o[0].height+"m";
					document.getElementById("YZBA"+y).innerHTML="y="+o[0].y+"m";
					document.getElementById("JZSWA"+y).innerHTML=o[0].waterdepths==undefined?"":o[0].waterdepths;
					document.getElementById("CJJWSDA"+y).innerHTML=o[0].waterdepth==undefined?"":o[0].waterdepth;
	                //------表头--------	
				   }
			   
				 }
			});
		}else{
			
					$.ajax({
						async: false,
						url: GetEGHOLEUrl,
						type: "post",
						success: function (data) {
							console.log(data);
							var aa1 = data;
							var aa2;
							$.ajax({
								async: false,
								url: GetEGHOLELayerUrl,
								type: "post",
								success: function (data2) {
									aa2 = data2;
									console.log(aa2);
								}
							});
							o=aa1;
							o2=aa2;	
					       huaTu();
					       
						   for(var y=1;y<=YS;y++){
						   //------表头--------	
							document.getElementById("ZKBHA"+y).innerHTML="ZK"+o[0].holeid;
							document.getElementById("XZBA"+y).innerHTML="x="+o[0].x+"m";				
							document.getElementById("ZKBGA"+y).innerHTML=o[0].height+"m";
							document.getElementById("YZBA"+y).innerHTML="y="+o[0].y+"m";
							document.getElementById("JZSWA"+y).innerHTML=o[0].waterdepths==undefined?"":o[0].waterdepths;
							document.getElementById("CJJWSDA"+y).innerHTML=o[0].waterdepth==undefined?"":o[0].waterdepth;
			                //------表头--------	
						   }
					   
						 }
					});
		}

	});
}

function openSEL(){
	var i;
	var j=0;
	for(var y=1;y<=YS;y++){
		document.getElementById("GCMCA"+y).contentEditable = true;	
		document.getElementById("GCBHA"+y).contentEditable = true;
		document.getElementById("ZKBHA"+y).contentEditable = true;	
		document.getElementById("XZBA"+y).contentEditable = true;
		document.getElementById("ZKZJA"+y).contentEditable = true;	
		document.getElementById("JZSWA"+y).contentEditable = true;
		document.getElementById("ZKBGA"+y).contentEditable = true;	
		document.getElementById("YZBA"+y).contentEditable = true;
		document.getElementById("CJJWSDA"+y).contentEditable = true;	
		document.getElementById("RiQiA"+y).contentEditable = true;
		document.getElementById("DuiWuA"+y).contentEditable = true;	
		document.getElementById("ZHITUA"+y).contentEditable = true;
		document.getElementById("TUHAOA"+y).contentEditable = true;	
		document.getElementById("RIQIA"+y).contentEditable = true;
		document.getElementById("JIAOHEA"+y).contentEditable = true;
	    
		document.getElementById("TLA"+y+"X").style.background="yellow";
		document.getElementById("GCMCA"+y).style.background="yellow";	
		document.getElementById("GCBHA"+y).style.background="yellow";
		document.getElementById("ZKBHA"+y).style.background="yellow";	
		document.getElementById("XZBA"+y).style.background="yellow";
		document.getElementById("ZKZJA"+y).style.background="yellow";	
		document.getElementById("JZSWA"+y).style.background="yellow";
		document.getElementById("ZKBGA"+y).style.background="yellow";	
		document.getElementById("YZBA"+y).style.background="yellow";
		document.getElementById("CJJWSDA"+y).style.background="yellow";	
		document.getElementById("RiQiA"+y).style.background="yellow";
		document.getElementById("DuiWuA"+y).style.background="yellow";	
		document.getElementById("ZHITUA"+y).style.background="yellow";
		document.getElementById("TUHAOA"+y).style.background="yellow";	
		document.getElementById("RIQIA"+y).style.background="yellow";
		document.getElementById("JIAOHEA"+y).style.background="yellow";
		
		
		for(i=j;i<o2.length;i++){
			var SEL=document.getElementById("SD"+y+i).innerHTML;
			//console.log(SEL);
			if(SEL/=null){
				document.getElementById("MS"+y+i).contentEditable = true;
				document.getElementById("SD"+y+i).contentEditable = true;
				document.getElementById("MS"+y+i).style.background="yellow";
			    document.getElementById("SD"+y+i).style.background="yellow";
				document.getElementById("selA"+y+i).style.display="block";

				document.getElementById("selA"+y+i).onclick=function (e){			
					console.log(e);targetID=e.target.parentNode.id;console.log(targetID);
					var t=$("#"+targetID)[0].offsetHeight;
					var top1=$("#"+targetID).offset().top+t;
					var left1=$("#"+targetID).offset().left+108;
					$('#TLdialog').window('open').window('resize',{width:'606px',height:'550px',top: top1,left:left1});
					}	;
			}else{
				j=i;
				//console.log(j);
				break;
			}
		}
		
		
		
		
	}
}

function lockSEL(){
	$('#TLdialog').window('close');
	var i;
	var j=0;
	for(var y=1;y<=YS;y++){
		document.getElementById('divA'+y).style.display="none";
		document.getElementById('anniu'+y).style.display="none";
		document.getElementById("GCMCA"+y).contentEditable = false;	
		document.getElementById("GCBHA"+y).contentEditable = false;
		document.getElementById("ZKBHA"+y).contentEditable = false;	
		document.getElementById("XZBA"+y).contentEditable = false;
		document.getElementById("ZKZJA"+y).contentEditable = false;	
		document.getElementById("JZSWA"+y).contentEditable = false;
		document.getElementById("ZKBGA"+y).contentEditable = false;	
		document.getElementById("YZBA"+y).contentEditable = false;
		document.getElementById("CJJWSDA"+y).contentEditable = false;	
		document.getElementById("RiQiA"+y).contentEditable = false;
		document.getElementById("DuiWuA"+y).contentEditable = false;	
		document.getElementById("ZHITUA"+y).contentEditable = false;
		document.getElementById("TUHAOA"+y).contentEditable = false;	
		document.getElementById("RIQIA"+y).contentEditable = false;
		document.getElementById("JIAOHEA"+y).contentEditable = false;	  

		document.getElementById("TLA"+y+"X").style.background="white";
		document.getElementById("GCMCA"+y).style.background="white";	
		document.getElementById("GCBHA"+y).style.background="white";
		document.getElementById("ZKBHA"+y).style.background="white";	
		document.getElementById("XZBA"+y).style.background="white";
		document.getElementById("ZKZJA"+y).style.background="white";	
		document.getElementById("JZSWA"+y).style.background="white";
		document.getElementById("ZKBGA"+y).style.background="white";	
		document.getElementById("YZBA"+y).style.background="white";
		document.getElementById("CJJWSDA"+y).style.background="white";	
		document.getElementById("RiQiA"+y).style.background="white";
		document.getElementById("DuiWuA"+y).style.background="white";	
		document.getElementById("ZHITUA"+y).style.background="white";
		document.getElementById("TUHAOA"+y).style.background="white";	
		document.getElementById("RIQIA"+y).style.background="white";
		document.getElementById("JIAOHEA"+y).style.background="white";
		
		
		//----------清空画布---------
	    var line=document.getElementById("mycanvas"+y);  
	    var ctxl=line.getContext("2d");
        line.height=line.height;
		//----------清空画布---------
		
		for(i=j;i<o2.length;i++){
			var SEL=document.getElementById("SD"+y+i).innerHTML;
			//console.log(SEL);
			if(SEL/=null){
				document.getElementById("MS"+y+i).contentEditable = false;
				document.getElementById("SD"+y+i).contentEditable = false;
				document.getElementById("MS"+y+i).style.background="white";
			    document.getElementById("SD"+y+i).style.background="white";
				//var ms=document.getElementById("MS"+y+i).innerHTML.split(":");
				var ms=document.getElementById("MS"+y+i).innerHTML;
				console.log(ms);
				o2[i].stratdec=ms;
				//o2[i].STRATNAME=ms[0];
		        o2[i].btmdepth=parseFloat(document.getElementById("SD"+y+i).innerHTML);
				var a=document.getElementById("TL"+y+i).style.backgroundImage;
				var b= a.split("t")[1].split(".")[0];
				//console.log(b);
				switch(b)
					{
						case "1":o2[i].stratlevel ="1";break;
						case "2":o2[i].stratlevel ="2-1";break;
						case "3":o2[i].stratlevel ="2-2";break;  
						case "4":o2[i].stratlevel ="2-3";break; 
						case "5":o2[i].stratlevel ="2-4";break;
						case "6":o2[i].stratlevel ="2-5";break;
						case "7":o2[i].stratlevel ="2-6";break;
						case "8":o2[i].stratlevel ="2-6b";break;
						case "9":o2[i].stratlevel ="2-7";break;
						case "10":o2[i].stratlevel ="3-1";break;
						case "11":o2[i].stratlevel ="3-2";break;
						case "12":o2[i].stratlevel ="4-1";break;
						case "13":o2[i].stratlevel ="4-2";break;
						case "14":o2[i].stratlevel ="4-3";break;
						case "15":o2[i].stratlevel ="5-1";break;
						case "16":o2[i].stratlevel ="5-2";break;
						case "17":o2[i].stratlevel ="5-3";break;
						case "18":o2[i].stratlevel ="6";break;
						case "19":o2[i].stratlevel ="7-1";break;
						case "20":o2[i].stratlevel ="7-2";break;
						case "21":o2[i].stratlevel ="8-1";break;
						case "22":o2[i].stratlevel ="8-2";break;
						case "23":o2[i].stratlevel ="9-1";break;
						case "24":o2[i].stratlevel ="9-2";break;
						case "25":o2[i].stratlevel ="9-3";break;
						case "26":o2[i].stratlevel ="10";break;
						case "27":o2[i].stratlevel ="11-1";break;
						case "28":o2[i].stratlevel ="11-2";break;
						case "29":o2[i].stratlevel ="11-3";break;
						case "30":o2[i].stratlevel ="11-4";break;	
						case "31":o2[i].stratlevel ="12";break;
						case "32":o2[i].stratlevel ="13-1";break;
						case "33":o2[i].stratlevel ="13-2";break;
						case "34":o2[i].stratlevel ="14-1";break;
						case "35":o2[i].stratlevel ="14-2";break;
						case "36":o2[i].stratlevel ="14-3";break;
						case "37":o2[i].stratlevel ="14-4";break;
					}
			}else{
				j=i;
				//console.log(j);
				break;
			}
		}
	}
	
	
	//------------清空之前在表格中插入的行------------
	for(var y=1;y<=YS;y++){
		var Table1=document.getElementById("tbA"+y+1);
		var rows1=Table1.rows.length;
		var Table2=document.getElementById("tbA"+y+2);
		var rows2=Table2.rows.length;
		var Table3=document.getElementById("tbA"+y+3);
		var rows3=Table3.rows.length;
		for(var k=1;k<rows1;k++){
			document.getElementById("tbA"+y+1).deleteRow(1);
		}
		for(var k=1;k<rows2;k++){
			document.getElementById("tbA"+y+2).deleteRow(1);
		}
		for(var k=1;k<rows3;k++){
			document.getElementById("tbA"+y+3).deleteRow(1);
		}
	}
	//------------清空之前在表格中插入的行------------
	
	console.log(o2);
	huaTu();
}
		

function huaTu(){		   

            
	var CDK = o2[o2.length-1].btmdepth;		

	//------比例--------
	/*var BLfengmu;    //这是写死的
	BLfengmu=200;*/
	var BLfengmu = $("#BLfengmu").val();
	var MeiMi=6/(1*BLfengmu/1000);      //150像素，每毫米代表6个元素点。
	//console.log(MeiMi);
	//------比例--------
    
	//------计算用多少页（总的只有6页）--------
	var YeShu=(CDK*MeiMi+o2.length*3)/(1478-115);        
	//115是表格中“地质时代”那一行的高度。
	YS=Math.ceil(YeShu);
	//console.log(YS);
	//------计算用多少页--------
	
	
	//更新图中的比例尺
	for(var x=1;x<=YS;x++){
		//console.log($("#TLA"+x+"X").html());
		var htmlNew = $("#TLA"+x+"X").html().split(":")[0]+":"+BLfengmu;
		//console.log(htmlNew);
		$("#TLA"+x+"X").html(htmlNew);
	}
	
	
	//-----------读取标贯试验表----------
	$.ajax({
			async: false,
			url: GetEgstdpenetrationUrl,
			type: "post",
			success: function (stdpdata) {
					console.log(stdpdata);
				    //------------计算标贯用多少页--------
					if(stdpdata.length>0){
						  var BGCDK=(parseFloat(stdpdata[stdpdata.length-1].ENDDEP)+parseFloat(stdpdata[stdpdata.length-1].STARTDEP))/2
						  //console.log(stdpdata[stdpdata.length-1].ENDDEP);
						  //console.log(stdpdata[stdpdata.length-1].STARTDEP);
						  var BGyeshu=(BGCDK*MeiMi+13)/(1478-115);       //表格底线在字体的下部，字体为20px，所以预留13px，保证字体中线能对准.
						  var BGYS=Math.ceil(BGyeshu);
						  //console.log(BGYS);
						  //console.log(BGyeshu);
					}else{
						  var BGYS=0;
						 //console.log(BGYS);
					}
				            //------------计算标贯用多少页--------
					//-----------读取标贯试验表----------
							
								
							
					var i;
					var j=0;
					var allHA3=0;
					var jianshao=0;
					var jianshao2=0;
					var arrHA3 = new Array();				
					document.getElementById("maxDiv").style.display="block";
					
					
					//-----------完成表格除标贯的其他部分------------------
					for(var y=1;y<=YS;y++){
						document.getElementById('divA'+y).style.display="block";
						document.getElementById('anniu'+y).style.display="block";
					
						
						
						var H1=0;
					    var H2=0;
						var h3=0;
						var h4=0;
						
					    var line=document.getElementById("mycanvas"+y);
						var ctxl=line.getContext("2d");
						
					    for(i=j;i<o2.length;i++){
						
						//--------------------计算各地层层厚----------------------------
						var CHS,CHST;
				        if(i==0){
				        	CHS=o2[i].btmdepth-0;			        	
				        	CHST=CHS.toFixed(2);			        				        	
				        }
				        else{
				        	CHS=o2[i].btmdepth-o2[i-1].btmdepth-0;			        	
				        	CHST=CHS.toFixed(2);			        				        	
				        }
				        //--------------------计算各地层层厚----------------------------
						
				
						var v1A=document.getElementById('tbA'+y+'1').insertRow(i-j+1);
						v1A.id="trA"+y+i;
						var h1A=v1A.insertCell(0);
				        var h2A=v1A.insertCell(1);
				        var h3A=v1A.insertCell(2);
				        var h4A=v1A.insertCell(3);
				        var h5A=v1A.insertCell(4);
				        var h6A=v1A.insertCell(5);
						var v2A=document.getElementById('tbA'+y+'2').insertRow(i-j+1);
				        var h7A=v2A.insertCell(0);
				        h1A.setAttribute("align","center");
				        h2A.setAttribute("align","center");
				        h3A.setAttribute("align","center");
				        h4A.setAttribute("align","center");
				        h5A.setAttribute("align","center");			       			        
				        h7A.style="word-break: break-all; word-wrap:break-word";			        
				        
				        h1A.id="MC"+y+i;           //-----------------地质时代--------------------------
				        h2A.id="CHao"+y+i;           //-----------------层 号---------------------------
				        h3A.id="GC"+y+i;           //----------------    层底标高
				        h4A.id="SD"+y+i;           //                  层底深度
						h5A.id="HD"+y+i;           //-----------------  分层厚度
				        h6A.id="TL"+y+i;           //-----------------   柱状图
				        h7A.id="MS"+y+i;           //-----------------地层描述-------------------------   
				        h6A.setAttribute("valign","top");
				        document.getElementById("MS"+y+i).style.borderLeftWidth=0;			        
				
				        var CHXS2=CHST*MeiMi;
						var CHXS=CHXS2.toFixed(0);
						if(CHST>=0.96){
							
							if(jianshao>0){
								document.getElementById("MC"+y+i).height=jianshao+"px";
								jianshao=0;
							}else{
								document.getElementById("MC"+y+i).height=CHXS-3+"px";
							}
							
							
						}else{
							if(jianshao>0){
								document.getElementById("MC"+y+i).height=jianshao+"px";
								jianshao=0;
							}else{
								document.getElementById("MC"+y+i).height=29-3+"px";
							}
							
							
						}
						
						document.getElementById("SD"+y+i).innerHTML=o2[i].btmdepth.toFixed(2);
						document.getElementById("CHao"+y+i).innerHTML=o2[i].stratlevel+"";			       
						document.getElementById("MS"+y+i).innerHTML=(o2[i].stratdec==undefined?"":o2[i].stratdec);	
						
						if(jianshao2>0){
								document.getElementById("MS"+y+i).height=jianshao2+"px";
								jianshao2=0;
							}
						//----------------层厚的输入--------------------------
				        h5A.innerHTML="<input id='CH' type='text' style='width:98%;height:98%;font-size:20px;border:0' >";
				        document.getElementById("CH").id="CH"+y+i;
				        document.getElementById("CH"+y+i).value=CHST;
				        //-----------------层厚的输入--------------------------
				
				
				
						
					    //---------------描线，画斜线，调整描述的table的大小---------------------------------
					    var h1=$('#MC'+y+i)[0].offsetHeight;
						//console.log(h1);
						var h2=$('#MS'+y+i)[0].offsetHeight;
						//console.log(h2);
						H1=H1+h1;
						H2=H2+h2;
						if(H1>H2){
							var chazhi=H1-H2;
							var c=h2+chazhi-3;
							H2=H2-h2;
							document.getElementById("MS"+y+i).height=c+"px";
						    h2=$('#MS'+y+i)[0].offsetHeight;
						    H2=H2+h2;
						}
						
						ctxl.beginPath();
						ctxl.moveTo(0*10,H1*10+115.2*10);
						ctxl.lineTo(6.19*10,H2*10+115.2*10);
						ctxl.strokeStyle="black";
						ctxl.lineWidth=10;
						ctxl.closePath();
						ctxl.stroke();		
						
						ctxl.beginPath();
						ctxl.moveTo(0,115.2*10);
						ctxl.lineTo(6.19*10,115.2*10);
						ctxl.strokeStyle="black";
						ctxl.lineWidth=10;
						ctxl.closePath();
						ctxl.stroke();
						
						
					    //---------------描线，画斜线，调整描述的table的大小-------------------------------
						
						   
						
						
						var stratum_level;
						/*var ARRSTRATLEVEL=o2[i].stratlevel.split("-");
						o2[i].stratlevel=ARRSTRATLEVEL[0]+"-"+ARRSTRATLEVEL[1];*/
						
						switch(o2[i].stratlevel)
						{
							case "1": stratum_level = 1;break;
							case "2-1": stratum_level = 2;break;
							case "2-2": stratum_level = 3;break;
							case "2-3": stratum_level = 4;break;
							case "2-4": stratum_level = 5;break;
							case "2-5": stratum_level = 6;break;
							case "2-6": stratum_level = 7;break;
							case "2-6b": stratum_level = 8;break;
							case "2-7": stratum_level = 9;break;
							case "3-1": stratum_level = 10;break;
							case "3-2": stratum_level = 11;break;
							case "4-1": stratum_level = 12;break;
							case "4-2": stratum_level = 13;break;
							case "4-3": stratum_level = 14;break;
							case "5-1": stratum_level = 15;break;
							case "5-2": stratum_level = 16;break;
							case "5-3": stratum_level = 17;break;
							case "6": stratum_level = 18;break;
							case "7-1": stratum_level = 19;break;
							case "7-2": stratum_level = 20;break;
							case "8-1": stratum_level = 21;break;
							case "8-2": stratum_level = 22;break;
							case "9-1": stratum_level = 23;break;
							case "9-2": stratum_level = 24;break;
							case "9-3": stratum_level = 25;break;
							case "10": stratum_level = 26;break;
							case "11-1": stratum_level = 27;break;
							case "11-2": stratum_level = 28;break;
							case "11-3": stratum_level = 29;break;
							case "11-4": stratum_level = 30;break;	
							case "12": stratum_level = 31;break;
							case "13-1": stratum_level = 32;break;
							case "13-2": stratum_level = 33;break;
							case "14-1": stratum_level = 34;break;
							case "14-2": stratum_level = 35;break;
							case "14-3": stratum_level = 36;break;
							case "14-4": stratum_level = 37;break;
							default:stratum_level = 37;break;
						}
				        
				        document.getElementById("TL"+y+i).style.backgroundImage="url(zuank/jpg/t"+stratum_level.toString()+".png)";
						
						var CDGC=o[0].height-o2[i].btmdepth;
				        var CDGCT;
				        CDGCT=CDGC.toFixed(2);
				        
				
				
						
				        document.getElementById("GC"+y+i).innerHTML=CDGCT;			        
				        document.getElementById("CH"+y+i).style.textAlign="center";			        			             	    			        			       		        
				        document.getElementById("TL"+y+i).innerHTML="<div id='selA'></div>";	
				        selA.style="border:0";
				        document.getElementById("selA").id="selA"+y+i;		
				        var hh=h1-3;	
				        
				        document.getElementById("selA"+y+i).style="height:"+hh+"px;width:100%;border:0;display:none;opacity:0;cursor:pointer";
						//console.log($("#selA"+y+i));
				
				        for(var ij=0;ij<69;ij++){
				        	
						  totalImg.push("jpg/"+ij+".jpg");
				        }
				
				        
				      
				    
				
				       
				        
				        //------------------当层数较少时，填充充页面---------------------------	
					    if(i==o2.length-1){
						   if(H1<(1478-115)){
							 var i2=i+1
							 var zengjia=1478-115-H1-3;
							 var zengjia2=1478-115-H2-3;
							 //console.log(zengjia);
							  var v1A=document.getElementById('tbA'+y+'1').insertRow(i2-j+1);
							  var h1A=v1A.insertCell(0);
							  var h2A=v1A.insertCell(1);
							  var h3A=v1A.insertCell(2);
							  var h4A=v1A.insertCell(3);
							  var h5A=v1A.insertCell(4);
							  var h6A=v1A.insertCell(5);
							  var v2A=document.getElementById('tbA'+y+'2').insertRow(i2-j+1);
							  var h7A=v2A.insertCell(0);
							  h1A.id="MC"+y+i2;           
							  h2A.id="CHao"+y+i2;           
							  h3A.id="GC"+y+i2;           
							  h4A.id="SD"+y+i2;          
							  h5A.id="HD"+y+i2;           
							  h6A.id="TL"+y+i2;          
							  h7A.id="MS"+y+i2;
							  var zj=zengjia.toFixed(0);
							  var zj2=zengjia2.toFixed(2);
				              document.getElementById("MC"+y+i2).height=zj+"px";
							  document.getElementById("MS"+y+i2).height=zj2+"px";
							  document.getElementById("MS"+y+i2).style.borderLeftWidth=0;
				              //document.getElementById("MC"+y+i2).style.borderBottomWidth=0;
				              //document.getElementById("MS"+y+i2).style.borderBottomWidth=0;						  
						    }
					    }
					    //------------------当层数较少时，填充充页面----------------------------		
						
						 
						//------------------当层数较多时，转到下一页--------------------------
					      if(H1>=(1478-115)){
							 //console.log(H1);
							jianshao=H1-(1478-115);
							jianshao2=H2-(1478-115);
							//console.log(H1);
							H1=H1-h1;
							H2=H2-h2;
							//console.log(H1);
							//console.log(jianshao);
							var js=h1-jianshao-3;
							var js2=h2-jianshao2-3;
							var jians=js.toFixed(0);
							var jians2=js2.toFixed(0);
							document.getElementById("MC"+y+i).height=jians+"px";
							document.getElementById("MS"+y+i).height=jians2+"px";
				            
							h3=$('#MC'+y+i)[0].offsetHeight;
							h4=$('#MS'+y+i)[0].offsetHeight;
							//console.log(h3);
							H1=H1+h3;
							H2=H2+h4;
							//console.log(H1);
							
							j=i;
							//console.log(j);
							
							//----------清空一页最后一行的内容，该内容在下一页首行显示；
							document.getElementById("CHao"+y+i).innerHTML="";
							document.getElementById("SD"+y+i).innerHTML="";
							document.getElementById("GC"+y+i).innerHTML="";	
							document.getElementById("CH"+y+i).value="";
							document.getElementById("MS"+y+i).innerHTML="";
							//----------清空一页最后一行的内容，该内容在下一页首行显示；
							
								
				            break;						
							}
							
						}
					    //------------------当层数较多时，转到下一页----------------------------
						
						
				
						
					}
				
				    //-----------完成表格除标贯的其他部分------------------
					
					
					
					
					//-----------修改图例-------------------------------
					var dataJson=[];
					for(var i=0;i<6;i++){
						var str={};
						for(var j=0;j<7;j++){
							str["col_"+(j+1)]=(i)*7+j;				
						}
						dataJson.push(str)
					}
					console.log(dataJson);
					function imgFormatter(value,row,index){
						var inx='col_1'.split('_')[1];
						if(value<38){
							//return "<img class='imgDemo' style='height:auto' src='jpg/"+value+".jpg'/>";		
							return "<div style='width:80px;height:80px;background-Image:url(zuank/jpg/t"+value+".png)' onMouseOut='this.style.height=\"80px\";this.style.width=\"80px\";this.style.border=\"0px\";' onMouseOver='this.style.width=\"70px\";this.style.height=\"70px\";this.style.border=\"2px red solid\";' onclick='changeImage(targetID,this.style.backgroundImage);'></div>";							
						}
					}
				
					$('#dg').datagrid({
						showHeader:false,
						singleSelect:true,
							data: dataJson/*[
									{col_1:'value11', col_2:'value12'},style='width:80px;height:80px' 
									{col_1:'value21', col_2:'value22'},
									{col_1:'value31', col_2:'value32'}
								]*/,
						columns:[[
							{field:'col_1', width:80,
								formatter: imgFormatter
							},
							{field:'col_2', width:80,
								formatter: imgFormatter
							},
							{field:'col_3', width:80,
								formatter: imgFormatter
							},
							{field:'col_4', width:80,
								formatter: imgFormatter
							},
							{field:'col_5', width:80,
								formatter: imgFormatter
							},
							{field:'col_6', width:80,
								formatter: imgFormatter
							},
							{field:'col_7', width:80,
								formatter: imgFormatter
							},
							/*{field:'col_8', width:80,
								formatter: imgFormatter
							},
							{field:'col_9', width:80,
								formatter: imgFormatter
							},			*/			
						]],
						onClickCell:function(index,field,value){
							console.log(index);console.log(field);console.log(value);
						},
						onSelect:function(index,row){
							$('#dg').datagrid('unselectAll');
						},
						
					});
					
					for(var idx=0;idx<count;idx++){console.log($("#TLA1"+idx)[0].clientHeight);
							$("#selA1"+idx).css('height',$("#TLA1"+idx)[0].clientHeight);
							$("#selA2"+idx).css('height',$("#TLA2"+idx)[0].clientHeight);
						}
						$(".panel .datagrid>div").css('background',"#E7E7E7");
					
					//-----------修改图例-------------------------------
					
					
					
					
					
					
					
					
					
					
					
					
					//---------------完成标贯部分-----------
					
					var v3A=document.getElementById('tbA'+1+'3').insertRow(1);
					var h1A=v3A.insertCell(0);
					var h2A=v3A.insertCell(1);
					var h3A=v3A.insertCell(2);
					h1A.id="ZDSD";           
					h2A.id="BGJS";
					h3A.id="FZ";
					document.getElementById("ZDSD").style.borderLeftWidth=0;
					document.getElementById("ZDSD").style.borderBottomWidth=0;
					//document.getElementById("ZDSD").style.borderTopWidth=0;
					document.getElementById("BGJS").style.borderBottomWidth=0;
					//document.getElementById("BGJS").style.borderTopWidth=0;
					document.getElementById("FZ").style.borderBottomWidth=0;
					//document.getElementById("FZ").style.borderTopWidth=0;
					document.getElementById("ZDSD").height=12.5-3+"px";
					
					
					
				
					
					
					if(BGYS==0){
						for(var y=1;y<=YS;y++){
							if(y==1){
								var v3A=document.getElementById('tbA'+y+'3').insertRow(2);
							}else{
								var v3A=document.getElementById('tbA'+y+'3').insertRow(1);
							}
							var h1A=v3A.insertCell(0);
							var h2A=v3A.insertCell(1);
							var h3A=v3A.insertCell(2);
							h1A.id="ZDSD"+y;           
							h2A.id="BGJS"+y;           
							h3A.id="FZ"+y;
							h1A.setAttribute("align","center");
				            h2A.setAttribute("align","center");
							document.getElementById("ZDSD"+y).style.borderLeftWidth=0;
							//document.getElementById("ZDSD"+y).style.borderBottomWidth=0;
							document.getElementById("ZDSD"+y).style.borderTopWidth=0;
							//document.getElementById("BGJS"+y).style.borderBottomWidth=0;
							document.getElementById("BGJS"+y).style.borderTopWidth=0;
							//document.getElementById("FZ"+y).style.borderBottomWidth=0;
							document.getElementById("FZ"+y).style.borderTopWidth=0;
							if(y==1){
								document.getElementById("ZDSD"+y).height=1478-115-11-3+"px";
								document.getElementById("ZDSD"+y).height=1478-115-11-3+"px";
							}else{
								document.getElementById("ZDSD"+y).height=1478-115-3+"px";
								document.getElementById("ZDSD"+y).height=1478-115-3+"px";
							}
							//border-left:0px solid black;font-size:20px;
						}
						
					}else{
						
					
						var k;
						var l=0;
						var H1=0;
						var jianshao3=0;
						for(var y=1;y<=YS;y++){
							if(y>BGYS){
								var v3A=document.getElementById('tbA'+y+'3').insertRow(1);
								var h1A=v3A.insertCell(0);
								var h2A=v3A.insertCell(1);
								var h3A=v3A.insertCell(2);
								h1A.id="ZDSD"+y+0;           
								h2A.id="BGJS"+y+0;           
								h3A.id="FZ"+y+0;
								h1A.setAttribute("align","center");
								h2A.setAttribute("align","center");
								document.getElementById("ZDSD"+y+0).style.borderLeftWidth=0;
								//document.getElementById("ZDSD"+0).style.borderBottomWidth=0;
								//document.getElementById("ZDSD"+y+0).style.borderTopWidth=0;
								//document.getElementById("BGJS"+0).style.borderBottomWidth=0;
								//document.getElementById("BGJS"+y+0).style.borderTopWidth=0;
								//document.getElementById("FZ"+0).style.borderBottomWidth=0;
								//document.getElementById("FZ"+y+0).style.borderTopWidth=0;
								document.getElementById("ZDSD"+y+0).height=1478-115-3+"px";
								document.getElementById("ZDSD"+y+0).height=1478-115-3+"px";
							}else{				
								
								  
								
								for(k=l;k<stdpdata.length;k++){
									
				
									//------------画标贯的中点深度用表格形式，需要计算各格厚度--------
									var CHS,CHST;
									if(k==0){
										CHS=(parseFloat(stdpdata[k].ENDDEP)+parseFloat(stdpdata[k].STARTDEP))/2-0;			        	
										CHST=CHS.toFixed(2);			        				        	
									}
									else{
										CHS=(parseFloat(stdpdata[k].ENDDEP)+parseFloat(stdpdata[k].STARTDEP))/2-(parseFloat(stdpdata[k-1].ENDDEP)+parseFloat(stdpdata[k-1].STARTDEP))/2;			        	
										CHST=CHS.toFixed(2);			        				        	
									}
									
									//------------画标贯的中点深度用表格形式，需要计算各格厚度--------
									if(y==1){
										
										var v3A=document.getElementById('tbA'+y+'3').insertRow(k-l+2);
									}else{
										var v3A=document.getElementById('tbA'+y+'3').insertRow(k-l+1);
									}
									var h1A=v3A.insertCell(0);
									var h2A=v3A.insertCell(1);
									var h3A=v3A.insertCell(2);
									h1A.id="ZDSD"+y+k;           
									h2A.id="BGJS"+y+k;           
									h3A.id="FZ"+y+k;
									h1A.setAttribute("align","center");
									h2A.setAttribute("align","center");
									h1A.setAttribute("vAlign","bottom");
									h2A.setAttribute("vAlign","bottom");
									document.getElementById("ZDSD"+y+k).style.borderLeftWidth=0;
									document.getElementById("ZDSD"+y+k).style.borderBottomWidth=0;
									document.getElementById("ZDSD"+y+k).style.borderTopWidth=0;
									document.getElementById("BGJS"+y+k).style.borderBottomWidth=0;
									document.getElementById("BGJS"+y+k).style.borderTopWidth=0;
									document.getElementById("FZ"+y+k).style.borderBottomWidth=0;
									document.getElementById("FZ"+y+k).style.borderTopWidth=0;
					
									var ZDS=(parseFloat(stdpdata[k].ENDDEP)+parseFloat(stdpdata[k].STARTDEP))/2;
									var ZDSD=ZDS.toFixed(2);
									var BGJS=stdpdata[k].BGJS;
				                    var BGGD=ZDSD*MeiMi;
				
									var CHXS2=CHST*MeiMi;
									var CHXS=CHXS2.toFixed(0);
									//console.log(jianshao3);
									
									if(jianshao3>0){
										document.getElementById("ZDSD"+y+k).height=jianshao3+"px";
										document.getElementById("ZDSD"+y+k).innerHTML=ZDSD;
										document.getElementById("BGJS"+y+k).innerHTML=BGJS;
										var ZDh1=$('#ZDSD'+y+k)[0].offsetHeight
										H1=H1+ZDh1;
										jianshao3=0;
				
									}else{
									      document.getElementById("ZDSD"+y+k).height=CHXS-2+"px";
										  document.getElementById("ZDSD"+y+k).innerHTML=ZDSD;
										  document.getElementById("BGJS"+y+k).innerHTML=BGJS;
										  var ZDh1=$('#ZDSD'+y+k)[0].offsetHeight
										  H1=H1+ZDh1;
									}
									
																					
									
									
								    //---------当层数不够时，补充--------------------
									if(k==stdpdata.length-1){
									   if(H1<(1478-115-12)){
										 var k2=k+1
										 var zengjia=1478-115-H1;
										 //console.log(zengjia);
										 if(y==1){
											var v1A=document.getElementById('tbA'+y+'3').insertRow(k2-l+2);
										 }else{
											 var v1A=document.getElementById('tbA'+y+'3').insertRow(k2-l+1);
										 }
										  var h1A=v1A.insertCell(0);
										  var h2A=v1A.insertCell(1);
										  var h3A=v1A.insertCell(2);
										  h1A.id="ZDSD"+y+k2;           
									      h2A.id="BGJS"+y+k2;           
										  h3A.id="FZ"+y+k2;
				                          document.getElementById("ZDSD"+y+k2).style.borderLeftWidth=0;
										 // document.getElementById("ZDSD"+y+k2).style.borderBottomWidth=0;
										  document.getElementById("ZDSD"+y+k2).style.borderTopWidth=0;
										  //document.getElementById("BGJS"+y+k2).style.borderBottomWidth=0;
										  document.getElementById("BGJS"+y+k2).style.borderTopWidth=0;
									   	  //document.getElementById("FZ"+y+k2).style.borderBottomWidth=0;
										  document.getElementById("FZ"+y+k2).style.borderTopWidth=0;
										  if(y==1){
											document.getElementById("ZDSD"+y+k2).height=zengjia-2-12+"px";
										  }else{
											document.getElementById("ZDSD"+y+k2).height=zengjia-2+"px";
										  }
										}
									}
				
									//---------当层数不够时，补充--------------------
									
									
									
									
									//----------当层数较多时，转到下一页------
									if(H1>=(1478-115-12)){
										//console.log(H1)
										jianshao3=H1-(1478-115-12);
										//console.log(CHXS);
										//console.log(jianshao3);
										document.getElementById("ZDSD"+y+k).height=CHXS-jianshao3-2+"px";
										l=k
										H1=0;
										
										
									    //----------清空一页最后一行的内容，该内容在下一页首行显示---
										document.getElementById("ZDSD"+y+k).innerHTML="";
										document.getElementById("BGJS"+y+k).innerHTML="";
				
										//----------清空一页最后一行的内容，该内容在下一页首行显示----
									
									    break
									}
								    //----------当层数较多时，转到下一页------
								
								}
				
							}
						}
					}
					//---------------完成标贯部分-----------------
					
					
					
					
			}
	})
}
           	
function adjustBLfengmu(){
	lockSEL();
}