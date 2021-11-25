
	var hole_mtx_1 = window.opener.hole_mtx_1;
	var delt_h = window.opener.delt_h;
	var holes = window.opener.holes;


// var stringHoleUrl = window.location.href.split("?")[1];
// var GetEGHOLEUrl = window.location.origin+"/taizhou/pouMianGetEGHOLE?"+stringHoleUrl;
// var GetEGHOLELayerUrl = window.location.origin+"/taizhou/pouMianGetEGHOLELayer?"+stringHoleUrl;
// var info;
// var layer;
var height = 700;
var width = 1800; 








var hole_dict = {"1":1,"2-1":2,"2-2":3,
				"2-3":4,"2-4":5,"2-5":6,
				"2-6":7,"2-6b":8,"2-7":9,
				"3-1":10,"3-2":11,"4-1":12,
				"4-2":13,"4-3":14,"5-1":15,
				"5-2":16,"5-3":17,"6":18,
				"7-1":19,"7-2":20,"8-1":21,
				"8-2":22,"9-1":23,"9-2":24,
				"9-3":25,"10":26,"11-1":27,
				"11-2":28,"11-3":29,"11-4":30,
				"12":31,"13-1":32,"13-2":33,
				"14-1":34,"14-2":35,"14-3":36,
				"14-4":37};

var  pre_seq = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37]

//得出数组最大值最小值的简单函数属性添加
Array.prototype.max = function(){ 
return Math.max.apply({},this) 
} 
Array.prototype.min = function(){ 
return Math.min.apply({},this) 
}




function standard(hole_info_mtx,holes){
	//
	//console.log(hole_info_mtx);
	
	var hole_level_mtx = new Array();

//先对每个钻孔补充排序
	hole_numbers = holes.length
	for (var i =0; i < hole_numbers; i++) {
	//前后相同的话合并相同的
		for (var j=1;  j<hole_info_mtx[i][0].length; j++){
			if (hole_info_mtx[i][0][j] == hole_info_mtx[i][0][j-1]){
				hole_info_mtx[i][0].splice(j,1);
				hole_info_mtx[i][1].splice(j,1);
			}
	}

	hole_level_mtx[i] = hole_info_mtx[i][0];//钻孔层信息
}
//深拷贝
	var new_hole_level_mtx = JSON.parse(JSON.stringify(hole_level_mtx));
	
	for (var i = 0;i<hole_numbers; i++){
		
		var max_level = Math.max.apply(null,new_hole_level_mtx[i]);
		
		var ctrl_level = 0;//控制序列
		var ctrl_level_1 = 0;//控制mtx
		//具体原理，将缺少的序列填充进去，因为序列中可能会存在逆序的情况，所以要依次判断，并填充
		while(ctrl_level< max_level){
			if (ctrl_level_1 +1 < new_hole_level_mtx[i].length	  ){//保证层数+1后不会超越数组长度
				
			 if (pre_seq[ctrl_level] < new_hole_level_mtx[i][ctrl_level_1]){//顺序序列小于mtx中当前id钻孔这一层
			 	if (new_hole_level_mtx[i][ctrl_level_1]<new_hole_level_mtx[i][ctrl_level_1+1]) {//mtx中当前层数小于下一层
			 		new_hole_level_mtx[i].splice(ctrl_level_1, 0, pre_seq[ctrl_level]);//将顺序序列中的此层插入
			 		ctrl_level_1++;
			 		ctrl_level++;
			 	}
			 	else{
			 		new_hole_level_mtx[i].splice(ctrl_level_1, 1, -new_hole_level_mtx[i][ctrl_level_1]);
			 		ctrl_level_1++;
			 	}
			 	//alert(new_hole_level_mtx[i]);
			 }
			 else{ctrl_level++;
				  ctrl_level_1++;
			 }
			}
			else{
				if (pre_seq[ctrl_level] < new_hole_level_mtx[i][ctrl_level_1]){
					new_hole_level_mtx[i].splice(ctrl_level_1, 0, pre_seq[ctrl_level]);
					ctrl_level_1++;
			 		ctrl_level++;
				}
				
				break ;
			}
		}
	}

//在此进行比较得出标准序列
	comp_seq = new_hole_level_mtx[0];
	
	for (var i=1;i<hole_numbers;i++ ){
		for(var j=0;j<new_hole_level_mtx[i].length;j++){
			var lay_num = new_hole_level_mtx[i][j];
			if ( lay_num < 0){
				next_lay = new_hole_level_mtx[i][j+1];
				lay_num_in_mtx = comp_seq.indexOf(next_lay);
				comp_seq.splice(lay_num_in_mtx,0,lay_num) ;
			}
			else{
				if (comp_seq.indexOf(lay_num)==-1){
					comp_seq.splice(j,0,lay_num);
				}
			}
		}
	}

		//alert(hole_info_mtx);
//用标准化序列对整体数据进行排序整合
	var top = holes[0][4];
	for (var i=1;i<hole_numbers;i++){
		if(top < holes[i][4]){
			top = holes[i][4];
		}
	}

	var delt_h = new Array();
	for (var i=0;i<hole_numbers;i++){
		delt_h.push(top-holes[i][4]);
	}

	for(var i =0;i<hole_numbers;i++){
		for (var j = 0;j<comp_seq.length;j++){
			if (hole_info_mtx[i][0][j]!=comp_seq[j]){
				hole_info_mtx[i][0].splice(j,0, comp_seq[j]);
				if (j<hole_info_mtx[i][1].length){
				
				hole_info_mtx[i][1].splice(j,0, hole_info_mtx[i][1][j]);
				}
				else{
					//hole_info_mtx[i][1].push(50+delt_h[i]);
				}
			}
		}
	}
	
	return hole_info_mtx

}

function delt_h_suit(delt_h,hole_mtx){
	for(var i=0;i<delt_h.length;i++){
		for(var j=0;j<hole_mtx[i][0].length;j++){
			hole_mtx[i][1][j]=hole_mtx[i][1][j]+delt_h[i];
		}
	}
	return hole_mtx;
}

//------temp----------
//var hole_dict = make_hole_matrix(info,layer);

layers =[[1, 3, 13, 14, 16, 18, 19],
[1, 3, 4, 13, 14, 15],
[1, 3, 4, 13, 14, 15, 18, 19, 21]]




depths = [[0, 1.4, 7.1, 13.8, 19.4, 24.5, 29.5, 52.5],
[0, 2.1, 3.9, 8.5, 15.8, 19.2, 20],
[0, 0.6, 7, 11.3, 18, 20.9, 28.5, 33.5, 39.4, 50]]

//在这里对矩阵信息进行赋值,make_hole_matrix可以不用，但是他会得到一个delt_h,这个后面需要使用

//需要的一共是3个数组
//hole_mtx_1 是总的矩阵信息数组，是三维数组最外围是钻孔数量，内部包含2个数组（钻孔层信息数组和钻孔深度信息数组）
//delta数组是每个钻孔的订层离三个顶层高度最高的距离


// hole_mtx_1 = [[[1, 2, 3, 4, 5, 6, 7],
// 			   [0, 1.4, 7.1, 13.8, 19.4, 24.5, 29.5, 52.5]],
// 			[[1, 3, 4, 5, 7, 9],
// 			 [0, 4.1, 6.9, 12.5, 20.8, 25.2, 27]],
// 			[[1,2, 3, 4, 5, 6, 7, 8, 9],
// 			 [0, 0.6, 7, 11.3, 18, 20.9, 28.5, 33.5, 39.4, 50]]]
// delt_h = [1.57,0.37, 0]
// //钻孔信息，钻孔编号，编码，x,y,空口高，总高度
// holes = [["251200611","J20",495807.0925372,3597078.56811,5.24,52.5],
// 		["251200292","J12",497912.9639804,3594605.6052615,6.44,20],
// 		["251200780","TZZK81",498342.974,3591689.8,6.81,50]]

// DP27剖面图
// hole_mtx_1 = [[[1, 5, 6, 7, 9],
// 			   [0, 2.5, 6.1, 15.8, 20, 24.3]],
// 			[[2, 6, 7, 8],
// 			 [0, 7.5, 21.8, 24.5, 27.5]],
// 			[[1, 5, 6, 7, 9],
// 			 [0, 1.3, 4.2, 14.6, 20.4, 24.8]]]
// delt_h = [7.32, 0, 3.94]
// //钻孔信息，钻孔编号，x,y,孔口高，总高度
// holes = [["251200611","SK316",2624029.2,515846,111.69,24.3],
// 		["251200292","CK47",2624046.1,515878.7,119.01,27.5],
// 		["251200780","SK317",2624063.3,515897.6,115.07,24.8]]
		

var holes_num = delt_h.length;
//console.log(holes_num);

//var hole_mtx_1 = hole_dict["matrix"];//总的矩阵信息//没有进行delt_h的修正
//delt_h=hole_dict["delt_h"];


var hole_mtx = JSON.parse(JSON.stringify(hole_mtx_1));
hole_mtx=delt_h_suit(delt_h,hole_mtx);//进行了delt_h的修正；


//var holes = hole_dict["holes"];//每个钻孔的信息
//var holes_1 = JSON.parse(JSON.stringify(holes));
//确定需要画多少tabs

//console.log(hole_mtx);


var new_hole_mtx = JSON.parse(JSON.stringify(hole_mtx));//一种深拷贝
var final_mtx = standard(new_hole_mtx,holes);//标准化后的序列，此时的深度信息比层信息多一行，主要在于存储了顶部和底部信息，必须多一行，否则最后无法对存在错误的数据进行自修正（错误来源于钻孔深度depth)


function need_draw_mtx(mtx){
	//传入的是总体矩阵
	var count = false;

	for (var i = 0; i < mtx[0][0].length -1 ; i++){//
		for (var j = 0; j < holes_num; j++){
			if ( (mtx[j][1][i] - mtx[j][1][i+1]) != 0 ){//如果上下两层存在不等于0的间距，证明此层存在
				count = true;//此层存在
				//break;
			}		
		}
		if (count  == true){//加入待画数组
			//console.log(mtx[j][]);
			
			count =false;//count重来
		}
		else{//不存在，删除
			//alert(count);
			for (var k =0 ;k<holes_num;k++){
				mtx[k][0].splice(i,1);
				mtx[k][1].splice(i,1);
			}
			//alert(mtx[0][1]);
		}
	}
	return mtx;
}

function make_length_arr(holes_private){//输入钻孔信息，得出每个钻孔的x坐标
	var x_1=holes_private[0][2];
	var y_1=holes_private[0][3];
	//console.log(x_1,y_1);
	var length_add_array = new Array();
	length_add_array.push()
	for (var i =1;i<holes_private.length;i++){
		var x_2 = holes_private[i][2];
		var y_2 = holes_private[i][3];
		
		if (i >1){
		var length = length_add_array[i-2] + Math.round(Math.sqrt(Math.pow(x_2-x_1,2)+Math.pow(y_2-y_1,2)))
		}
		else{
			var length = Math.round(Math.sqrt(Math.pow(x_2-x_1,2)+Math.pow(y_2-y_1,2)))
		}
		length_add_array.push(length);
		
		x_1 = x_2;
		y_1 = y_2;
		//console.log(x_1,y_1);
	}
//	alert(length_add_array);//28404,47000
	length_add_array.splice(0,0,0)
	//alert(length_add_array);//28404,47000
	return length_add_array;//存储每个孔的间距信息
}



function backward(str,i,length_arr,depth_arr,h_ratio,w_ratio){//逆向画线
	str =str + "C" + ((1900+length_arr[holes_num-2]*w_ratio +100 )/2).toString() + " " + (depth_arr[i][holes_num-1]*h_ratio+100).toString() +" "  ;//head
	for (var j=holes_num-2;j>0;j--){
		str=str+" " +((length_arr[j+1]+length_arr[j])/2*w_ratio +100 ).toString()+ " " + (depth_arr[i][j]*h_ratio+100).toString() +" " + (length_arr[j]*w_ratio+100).toString() + " "+(depth_arr[i][j]*h_ratio+100).toString() +" " + ((length_arr[j-1]+length_arr[j])/2*w_ratio +100 ).toString()+ " " + (depth_arr[i][j]*h_ratio+100).toString()+" ";
	}
	str = str + ((100+length_arr[1]*w_ratio +100 )/2).toString() + " " + (depth_arr[i][0]*h_ratio+100).toString() +" 100 "+(depth_arr[i][0]*h_ratio+100).toString()+" ";
	return str;
}

function foreward(str,i,length_arr,depth_arr,h_ratio,w_ratio){//逆向画线
	str =str + "C" + ((100+length_arr[1]*w_ratio +100 )/2).toString() + " " + (depth_arr[i][0]*h_ratio+100).toString() +" "  ;//head
	for (var j=1;j<holes_num-1;j++){
		str=str+" " +((length_arr[j-1]+length_arr[j])/2*w_ratio +100 ).toString()+ " " + (depth_arr[i][j]*h_ratio+100).toString() +" " + (length_arr[j]*w_ratio+100).toString() + " "+(depth_arr[i][j]*h_ratio+100).toString() +" " + ((length_arr[j+1]+length_arr[j])/2*w_ratio +100 ).toString()+ " " + (depth_arr[i][j]*h_ratio+100).toString() +" " ;
	}
	str = str +((1900+length_arr[holes_num-2]*w_ratio +100 )/2).toString() + " " + (depth_arr[i][holes_num-1]*h_ratio+100).toString() +" 1900 "+(depth_arr[i][holes_num-1]*h_ratio+100).toString()+" ";
	return str;
}

function create_ele(str,layer_arr,name){//画线并画clipPath

	var quote = "http://www.w3.org/2000/svg";
	var defs = document.getElementById("mydefs_1");//mydefs_1
	
	var clippath = document.createElementNS(quote,"clipPath");
	clippath.setAttribute("id","clipPath"+name);
	var path =document.createElementNS(quote,"path");
	path.setAttribute("d",str);
	
	path.setAttribute("stroke","black");	
	path.setAttribute("stroke-width","1px");
	
	
	clippath.appendChild(path);
	defs.appendChild(clippath);

	var g= document.getElementById("lines");
	var g1= document.getElementById("hole_lines");
	var path1 =document.createElementNS(quote,"path");
	path1.setAttribute("d",str);
	
	if (name=="_fill_grey"){
		path1.setAttribute("fill","lightgrey");
	}
	else{
	path1.setAttribute("stroke","black");
	//path1.setAttribute("stroke-width","1px");
	path1.setAttribute("fill","none");
	}
	
	//g.appendChild(path1);
	g1.appendChild(path1);
	

}

function suit_mtx(mtx_with_lay,holes){//将含有层信息的mtx转为只含深度信息的mtx
	console.log(holes);
	var layer_arr= mtx_with_lay[0][0];

	var top = holes[0][4];
	var down = -holes[0][5]+holes[0][4];
	var depth = 0;	

	for (var i=1;i<holes.length;i++){
		if(top < holes[i][4]){
			top = holes[i][4];
		}
		if ((-holes[i][5] + holes[i][4])<down){
			down = -holes[i][5]+holes[i][4];
		}
	}

	//console.log("down",down);


	var top1=Math.ceil(top);
	var delt_top = top1-top;
	var down1 = Math.floor(down);
	var real_height = top1-down1;
	//console.log("top1",top1);
	//console.log("down1",down1);
	var delt_down = down-down1;
	//console.log("real_height",real_height);
	//var every_part_y = Math.round(real_height/10);
	var every_part_y = Math.ceil(real_height/10);
	var cal_top =down1 + 10*every_part_y;
	var h_ratio = height/(10*every_part_y);

	//console.log("top:",top,"h_ratio",h_ratio);

	var delt_h = cal_top - top ;

	var depth_mtx = new Array();
	var layer_arr = mtx_with_lay[0][0];//所有要画的层号，可能含有负值
	//console.log(layer_arr);
	for (var i=0;i<mtx_with_lay[0][1].length;i++){
		var arr = new Array();
		for (var j=0;j<holes_num;j++){
			arr.push(mtx_with_lay[j][1][i]);
			//console.log(arr);
		}
		depth_mtx.push(arr);
	}

		//左侧坐标系调整后对每层深度坐标进行调整
	//var delt_h = cal_top - top
	for(var i=0;i<depth_mtx[0].length;i++){
		for(var j=0;j<depth_mtx.length;j++){
			depth_mtx[j][i]=depth_mtx[j][i] + delt_h;
		}
	}

	
	//console.log(depth_mtx);
	//console.log(h_ratio);
	//console.log(layer_arr);
	return {"depth_mtx":depth_mtx,"h_ratio":h_ratio,"layer_arr":layer_arr};
}
			  //depth_mtx,length_add_array,holes,h_ratio
function draw(depth_mtx,length_add_array,holes,h_ratio){//输入矩阵信息和x坐标信息
	
	
	//console.log("depth_mtx:"+depth_mtx);
	//console.log("lenth of layer:",layer_arr.length,"length of depth_mtx:",depth_mtx.length);
	//console.log(h_ratio);

	var w_ratio = width / length_add_array[length_add_array.length-1];
	var left_x=100;
	var up_y = 100;
	
	var judge_sign = 1;//如果为1就是从顺时针；为-1则逆时针；
	
	
	//左侧坐标系调整后对每层深度坐标进行调整
	//var delt_h = cal_top - top
	var lay_num = layer_arr.length;

	for (var i=0;i<layer_arr.length;i++){
		
			var str = " M 100 "+ (depth_mtx[i][0]*h_ratio + 100).toString() + " " ;
			str = foreward(str,i,length_add_array,depth_mtx,h_ratio,w_ratio) ;//三次贝塞尔曲线 算法见附件
			str = str + " L 1900 " + (depth_mtx[lay_num][holes_num-1]*h_ratio + 100).toString();

			str = backward(str,lay_num,length_add_array,depth_mtx,h_ratio,w_ratio);
			
			str = str +" L 100 " + (depth_mtx[i][0]*h_ratio + 100).toString();
			//console.log(str);
			create_ele(str,layer_arr, Math.abs(layer_arr[i]));
		}

		

	str = "M 1900 " + (depth_mtx[lay_num][holes_num-1]*h_ratio +100).toString() +" ";
	str =  backward(str,lay_num,length_add_array,depth_mtx,h_ratio,w_ratio);
	str = str + "L 100 800 1900 800 1900 " + (depth_mtx[lay_num][holes_num-1]*h_ratio+100).toString() + " ";	
	create_ele(str,layer_arr,"_fill_grey");

}

// M 100 797.305 C1000 797.305 1000 756.7633333333333 1900 756.7633333333333  L 1900 730.805 C1000 730.805 1000 797.305 100 797.305  L 100 797.305
// M 100 797.305 C1000 797.305 1000 756.7633333333333 1900 756.7633333333333  L 1900 730.805 C1000 730.805 1000 797.305 100 797.305  L 100 797.305
																		 //d="M 1900 730.805 C1000 730.805 1000 797.305 100 797.305  L 100 800 1900 800 1900 730.805 "
//填充物图例的文字说明
var strN = new Array();
strN[0] ="岩溶充填物";
strN[1] ="中风化板岩夹千枚岩";
strN[2] ="强风化板岩夹千枚岩";
strN[3] ="碎石土";
strN[4] ="构造破碎带";
strN[5] ="混合花岗岩";
strN[6] ="变质砂岩";
strN[7] ="千枚状砂岩";
strN[8] ="强风化层";
strN[9] ="全风化层";
strN[10]="粉质粘土";
strN[11]="裂隙密集带";
strN[12]="节理密集带";
strN[13]="花岗片麻岩";
strN[14]="断层破碎带";
strN[15]="中风化千枚岩夹板岩";
strN[16]="中风化页岩";
strN[17]="强风化千枚岩";
strN[18]="强风化页岩";
strN[19]="粉质粘土夹碎石";
strN[20]="构造破碎带";
strN[21]="中风化板岩";
strN[22]="强风化板岩夹千枚岩";
strN[23]="碎石土";
strN[24]="粉质粘土";
strN[25]="破碎带或裂隙密集发育带";
strN[26]="中风化灰岩夹页岩";
strN[27]="强风化灰岩夹页岩";
strN[28]="全风化页岩";
strN[29]="粉质粘土夹碎石";
strN[30]="溶蚀发育区";
strN[31]="中风化灰岩";
strN[32]="岩溶发育区";
strN[33]="中风化砂岩夹页岩";
strN[34]="中风化页岩夹砂岩";
strN[35]="推测构造破碎带";
strN[36]="破碎层";
strN[37]="千枚状砂岩、变质砂岩夹千枚岩、炭质千枚岩";
strN[38]="变质砂岩、板岩、局部含炭、石英岩、硅质岩，夹灰岩透镜体";
strN[39]="强风化层";
strN[40]="灰岩、炭质灰岩夹页岩";
strN[41]="残坡积土及全风化层";

function draw_nothing_and_tuli(depth_mtx,holes,length_add_array,layer_arr,h_ratio){//对于图中不会出现的图层
	var w_ratio = width / length_add_array[length_add_array.length-1];
	
	
	var defs = document.getElementById("mydefs_1");
	var quote = "http://www.w3.org/2000/svg";
	var y = (100+height)-layer_arr.length*(20+10)+10;
	var x = width +100 +50;


	for (var j=1;j<42;j++){
		if (layer_arr.indexOf(j)==-1){
			var clippath = document.createElementNS(quote,"clipPath");
			clippath.setAttribute("id","clipPath"+ (j).toString());
			var path =document.createElementNS(quote,"path");
			path.setAttribute("d","M 1 1");
			path.setAttribute("stroke","black");
			clippath.appendChild(path);
			defs.appendChild(clippath);
		}
		else{//画图例

			//var g_tuli = document.getElementById("tuli");
			var g_tuli = document.getElementById("tuli");
			var rect = document.createElementNS(quote,"rect");
			rect.setAttribute("x",x.toString());
			rect.setAttribute("y",y.toString())
			
			rect.setAttribute("width","50");
			rect.setAttribute("height","20");
			rect.setAttribute("fill","url(#pattern-image"+(j).toString() + ")");
			g_tuli.appendChild(rect);
			//添加图例文字说明
			var g_text = document.getElementById("text");
			var text =  document.createElementNS(quote,"text");
			text.setAttribute("x",(x+70).toString());
			text.setAttribute("y",(y+15).toString());
			y = y +30;
			text.textContent = strN[j];
			g_text.appendChild(text);
		}
	}
/*
	var g_ruler =document.getElementById("ruler");
	var g_text =document.getElementById("text");*/
	// var g_ruler =document.getElementById("ruler_1");
	var g_ruler =document.getElementById("ruler");
	var g_text =document.getElementById("text");

	//竖直方向上的标尺的调整

	var top = holes[0][4];
	var down = -holes[0][5]+holes[0][4];
	var depth = 0;	

	for (var i=1;i<holes.length;i++){
		if(top < holes[i][4]){
			top = holes[i][4];
		}
		if ((-holes[i][5] + holes[i][4])<down){
			down = -holes[i][5]+holes[i][4];
		}
	}

//策略是：从底往上画坐标上面的课稍微调整,画11个格

	top1=Math.ceil(top);
	var delt_top = top1-top;
	down1 = Math.floor(down);
	var real_height = top1-down1;
	var delt_down = down-down1;

	//var every_part_y = Math.round(real_height/10);
	var every_part_y = Math.ceil(real_height/10);
	var cal_top =down1 + 10*every_part_y;//计算调整后的顶部
	//console.log("CAL_TOP:",cal_top,"DOWN:",down1,"HEIGHT:",real_height,"y:",every_part_y);
	var every_part_x = Math.round(length_add_array[length_add_array.length-1]/10);


	
	for(var i=0;i<10;i++){//左侧坐标上，画出每条写文字的线，并写上文字
		var path =document.createElementNS(quote,"path");
		var str =" M 18 " +(800-70*i).toString() + " l 44 0" ;
		path.setAttribute("d",str);
		path.setAttribute("stroke","black");
		path.setAttribute("stroke-width","1px");

		var path1 =document.createElementNS(quote,"path");
		var str1 =" M  " +(100+180*i).toString() + " 828 l 0 20" 
		path1.setAttribute("d",str1);
		path1.setAttribute("stroke","black");
		path1.setAttribute("stroke-width","1px");
		g_ruler.appendChild(path);
		g_ruler.appendChild(path1);

		var text =  document.createElementNS(quote,"text");
		text.setAttribute("x","19");
		text.setAttribute("y",(797-70*i).toString());
		
		text.textContent = (down1+i*every_part_y).toString();
		g_text.appendChild(text);

		var text1 = document.createElementNS(quote,"text");
		text1.setAttribute("x",(78 + 180*i).toString());
		text1.setAttribute("y","865");
		text1.textContent = (0+i*every_part_x).toString();
		g_text.appendChild(text1);
	}

	var path1 =document.createElementNS(quote,"path");
	var str1 =" M  " + "1900 828 l 0 20" 
	path1.setAttribute("d",str1);
	path1.setAttribute("stroke","black");
	path1.setAttribute("stroke-width","1px");
	g_ruler.appendChild(path);
	g_ruler.appendChild(path1);
	var text1 = document.createElementNS(quote,"text");
	text1.setAttribute("x",(78 + 180*i).toString());
	text1.setAttribute("y","865");
	text1.textContent = (0+10*every_part_x).toString();
	g_text.appendChild(text1);


	var text = document.createElementNS(quote,"text");
	text.setAttribute("x","10");
	text.setAttribute("y","80");
	text.textContent = "高程(m)";
	g_text.appendChild(text);
	
	var text1 = document.createElementNS(quote,"text");
	text1.setAttribute("x","1930");
	text1.setAttribute("y","835");
	text1.textContent = "距离(m)";
	g_text.appendChild(text1);

	//画竖线和钻孔名称
	var g_hole_lines = document.getElementById("hole_lines")

	for (var i=0;i<length_add_array.length;i++){
		var path =document.createElementNS(quote,"path");
		str =" M " +(length_add_array[i]*w_ratio+100).toString() +" " +(depth_mtx[0][i]*h_ratio+100).toString() + " L  "+(length_add_array[i]*w_ratio+100).toString()+" "  +(depth_mtx[layer_arr.length][i]*h_ratio+100).toString();
		path.setAttribute("d",str);
		path.setAttribute("stroke","black");
		path.setAttribute("stroke-width","2px");
		g_hole_lines.appendChild(path);

		var text = document.createElementNS(quote,"text");
		text.setAttribute("x",(length_add_array[i]*w_ratio+100-20).toString())
		text.setAttribute("y","80");
		text.textContent=("ZK"+holes[i][0]).toString();
		//钻孔名称
		// g_text.appendChild(text);
	}
}






var mtx_with_lay =need_draw_mtx(final_mtx);
console.log(mtx_with_lay);
var length_add_array = make_length_arr(holes);
console.log(length_add_array);
var mtx_dict = suit_mtx(mtx_with_lay,holes)
//console.log(mtx_dict);
var depth_mtx = mtx_dict["depth_mtx"];
var h_ratio = mtx_dict["h_ratio"];
var layer_arr =mtx_dict["layer_arr"];
draw(depth_mtx,length_add_array,holes,h_ratio);
draw_nothing_and_tuli(depth_mtx,holes,length_add_array,layer_arr,h_ratio);

//结束drawsvg


// window.onload = function(){

//     //获取svg内容
//     var svg = document.getElementById('heresvg').innerHTML;

//     var canvas = document.getElementById('canvas');
// 	var c = canvas.getContext('2d');
	

//     //新建Image对象
//     var img = new Image();

//     //svg内容
//     img.src = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg));//svg内容中可以有中文字符
//     img.src = 'data:image/svg+xml,' + svg;//svg内容中不能有中文字符

//     //svg编码成base64
//     img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));//svg内容中可以有中文字符
//     //img.src = 'data:image/svg+xml;base64,' + window.btoa(svg);//svg内容中不能有中文字符

//     //图片初始化完成后调用
//     img.onload = function() {



//         //将canvas的宽高设置为图像的宽高
//     	//console.log(img.width);
//     	//console.log(img.height);
//         canvas.width =1800;//img.width-100 ;
//         canvas.height = 700;//img.height-100;
        
//         //canvas画图片
// 		//前四个数字是原来svg图里面主要位置，后四个数字数这个图片里的
// 		c.fillStyle = "#CCCCCC";
// 		c.fillRect(0, 0, canvas.width, canvas.height);
//         c.drawImage(img, 100, 100,1800,700, 0, 0,1800,700);
//         //
// 		//c.beginPath();
// 		//c.moveTo(20,20);
// 		//c.quadraticCurveTo(20,100,200,20);
// 		//c.stroke();
//         //将图片添加到body中
        
//     }
// }

////用canvg.js方法将svg转canvas
// window.onload = () => {
// 	var svgHtml = svgContainer.innerHTML();
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');

//     v = canvg.Canvg.fromString(ctx, '<svg width="600" height="600"><text x="50" y="50">Hello World!</text></svg>');

//     // Start SVG rendering with animations and mouse handling.
//     v.start();

// };


// html2canvas(document.querySelector("#heresvg"),{
// 	taintTest : false,  
// 	useCORS : true,   
// 	allowTaint :false,
// }).then(canvas => {
//     document.body.appendChild(canvas)
// });