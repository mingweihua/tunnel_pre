
var geoData = {

    BLS: {
		0 : {
			lithology : "中风化板岩夹千枚岩",
			color ： "#0BF131",
			pic : "1.png"
		},
		1 : {
			lithology : "强风化板岩夹千枚岩",
			color : "#0BC8F1",
			pic : "2.png"
		},
		2 : {
			lithology : "碎石土",
			color : "#F6ABAF",
			pic : "3.png"
		},
		fractures : {
			lithology : "构造破碎带",
			color : "#F884E1",
			pic : "4.png"
		}
    },
    
};

var geoData = {
	BLS:{
	0:{lithology:"中风化板岩夹千枚岩",color:"#0BF131",pic:"../../../images/textures/1.png"},
	1:{lithology:"强风化板岩夹千枚岩",color:"#0BC8F1",pic:"../../../images/textures/2.png"},
	2:{lithology:"碎石土",color:"#F6ABAF",pic:"../../../images/textures/3.png"},
	fractures:{lithology:"构造破碎带",color:"#F884E1",pic:"../../../images/textures/4.png"},
	},
	MYS1:{
	0:{lithology:"混合花岗岩",color:"#FCF885",pic:"../../../images/textures/5.png"},
	1:{lithology:"变质砂岩",color:"#FCB585",pic:"../../../images/textures/6.png"},
	2:{lithology:"千枚状砂岩",color:"#F585FC",pic:"../../../images/textures/7.png"},
	3:{lithology:"强风化层",color:"#E9E4EA",pic:"../../../images/textures/8.png"},
	4:{lithology:"全风化层",color:"#CDC6CE",pic:"../../../images/textures/9.png"},
	5:{lithology:"粉质粘土",color:"#F6EA62",pic:"../../../images/textures/10.png"},
	},
	MYS2:{
	0:{lithology:"千枚岩砂岩",color:"#F585FC",pic:"../../../images/textures/7.png"},
	1:{lithology:"强风化层",color:"#E9E4EA",pic:"../../../images/textures/8.png"},
	2:{lithology:"强风化层",color:"#E9E4EA",pic:"../../../images/textures/8.png"},
	3:{lithology:"粉质粘土",color:"#F6EA62",pic:"../../../images/textures/10.png"},
	{:"fractures",lithology:"裂隙密集带",color:"#938FEE",pic:"../../../images/textures/11.png"},
	{:"hole",lithology:"节理密集带",color:"#6BEE5A",pic:"../../../images/textures/12.png"},
	},
	MYS3:{
	0:{lithology:"",color:"#BBC452",pic:"../../../images/textures/13.png"},
	1:{lithology:"千枚状砂岩",color:"#F585FC",pic:"../../../images/textures/7.png"},
	2:{lithology:"强风化层",color:"#E9E4EA",pic:"../../../images/textures/8.png"},
	3:{lithology:"粉质粘土",color:"#F6EA62",pic:"../../../images/textures/10.png"},
	{:"fractures",lithology:"断层破碎带",color:"#CFCA44",pic:"../../../images/textures/14.png"},
	},
	XB:{
	0:{lithology:"中风化千枚岩夹板岩",color:"#EBF27D",pic:"../../../images/textures/15.png"},
	1:{lithology:"中风化板岩夹千枚岩",color:"#0BF131",pic:"../../../images/textures/1.png"},
	2:{lithology:"中风化页岩",color:"#F2ADEE",pic:"../../../images/textures/16.png"},
	3:{lithology:"强风化千枚岩",color:"#C89797",pic:"../../../images/textures/17.png"},
	4:{lithology:"强风化板岩夹千枚岩",color:"#0BC8F1",pic:"../../../images/textures/2.png"},
	5:{lithology:"强风化页岩",color:"#B6B1F8",pic:"../../../images/textures/18.png"},
	{:6,lithology:"粉质粘土夹碎石",color:"#F8D9F5",pic:"../../../images/textures/19.png"},
	{:"fractures",lithology:"构造破碎带",color:"#DFF8B3",pic:"../../../images/textures/20.png"},
	},
	ZZ:{
	0:{lithology:"中风化板岩",color:"#3E259C",pic:"../../../images/textures/21.png"},
	1:{lithology:"强风化板岩夹千枚岩",color:"#B826A2",pic:"../../../images/textures/22.png"},
	2:{lithology:"碎石土",color:"#1BC61B",pic:"../../../images/textures/23.png"},
	3:{lithology:"粉质粘土",color:"#41C4BC",pic:"../../../images/textures/24.png"},
	{:"fractures",lithology:"破碎带或裂隙密集发育带",color:"#B7CBE8",pic:"../../../images/textures/25.png"},
	},
	YM1:{
	0:{lithology:"中风化灰岩夹页岩",color:"#73CC1C",pic:"../../../images/textures/26.png"},
	1:{lithology:"强风化灰岩夹页岩",color:"#C86F34",pic:"../../../images/textures/27.png"},
	2:{lithology:"全风化页岩",color:"#B826A2",pic:"../../../images/textures/28.png"},
	3:{lithology:"粉质粘土夹碎石",color:"#41C4BC",pic:"../../../images/textures/29.png"},
	{:"hole",lithology:"溶蚀发育区",color:"#F6EA62",pic:"../../../images/textures/30.png"},
	},
	YM2:{
	0:{lithology:"中风化灰岩",color:"#73CC1C",pic:"../../../images/textures/31.png"},
	1:{lithology:"全风化页岩",color:"#B826A2",pic:"../../../images/textures/28.png"},
	2:{lithology:"碎石土",color:"#1BC61B",pic:"../../../images/textures/23.png"},
	3:{lithology:"粉质粘土",color:"#41C4BC",pic:"../../../images/textures/24.png"},
	{:"hole",lithology:"岩溶发育区",color:"#F6EA62",pic:"../../../images/textures/32.png"},
	},
	YT:{
	0:{lithology:"中风化砂岩夹页岩",color:"#C86F34",pic:"../../../images/textures/33.png"},
	1:{lithology:"中风化页岩夹砂岩",color:"#41C4BC",pic:"../../../images/textures/34.png"},
	2:{lithology:"中风化砂岩夹页岩",color:"#C86F34",pic:"../../../images/textures/33.png"},
	3:{lithology:"碎石土",color:"#1BC61B",pic:"../../../images/textures/23.png"},
	{:"fractures",lithology:"推测构造破碎带",color:"#A4731E",pic:"../../../images/textures/35.png"},
	{:"hole",lithology:"破碎层",color:"#F6EA62",pic:"../../../images/textures/36.png"},
	},
	XFD:{
	0:{lithology:"千枚状砂岩、变质砂岩夹千枚岩、炭质千枚岩",color:"#73CC1C",pic:"../../../images/textures/37.png"},
	1:{lithology:"变质砂岩、板岩、局部含炭、石英岩、硅质岩，夹灰岩透镜体",color:"#41C4BC",pic:"../../../images/textures/38.png"},
	2:{lithology:"变质砂岩、板岩、局部含炭、石英岩、硅质岩，夹灰岩透镜体",color:"#73CC1C",pic:"../../../images/textures/37.png"},
	3:{lithology:"强风化层",color:"#B826A2",pic:"../../../images/textures/39.png"},
	4:{lithology:"变质砂岩、板岩、局部含炭、石英岩、硅质岩，夹灰岩透镜体",color:"#41C4BC",pic:"../../../images/textures/38.png"},
	5:{lithology:"灰岩、炭质灰岩夹页岩",color:"#C86F34",pic:"../../../images/textures/40.png"},
	{:6,lithology:"残坡积土及全风化层",color:"#F6EA62",pic:"../../../images/textures/41.png"},
	}
	}