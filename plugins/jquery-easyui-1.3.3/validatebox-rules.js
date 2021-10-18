$.extend($.fn.validatebox.defaults.rules, {
    number: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: 'Please enter at least {0} characters.'
    },
    pureNumber:{
        validator: function(value, param){
            return isPureNumber(value);
        },
        message: '存在非数字字符'
    },
	unique:{
        validator: function(value, param){
			console.log(checkExist(value));
			return checkExist(value);
        },
        message: '该用户名已存在'
    },
	uniqueCode:{
        validator: function(value, param){
		/*	console.log("uniqueCode");
		    console.log("value:  "+value);
        	console.log("param:  "+param);*/
			console.log("pure  "+isPureNumber(value));
			console.log("isUnique  "+isUnique(param,value));
			var msg=[];
			if(!isUnique(param,value)){
				msg.push("该值与其他数据重复");
			}
			if(!isPureNumber(value)){
				msg.push("存在非数字字符");				
			}
			$.fn.validatebox.defaults.rules.uniqueCode.message =msg.join("且");
			return isUnique(param,value)&&isPureNumber(value);
        },
        message: '该值与其他数据重复或存在非数字字符'
    },
	idcard: {// 验证身份证
		validator: function (value) {
			var reg= /\d{17}[\d|x]|\d{15}/;
			return reg.test(value);
		},
		message: '身份证号码格式不正确'
	},
	phone: {// 验证电话号码
		validator: function (value) {
			var reg= /^[0-9]{3,4}\-[0-9]{7,8}$/;///[0-9-()（）]{7,18}/;
			return reg.test(value);
		},
		message: '格式不正确,请使用下面格式:0516-88888888'
	},
	mobile: {// 验证手机号码
        validator: function (value) {
            var reg =  /0?(13|14|15|18)[0-9]{9}/;
            return reg.test(value);
        },
        message: "输入手机号码格式不正确."
	},
	Name: {// 验证姓名
		validator: function (value) {
			var regcn=/^[\u4e00-\u9fa5 ]{2,20}$/;
			var regen=/^[a-zA-Z \s]{2,20}$/;
			return regcn.test(value)||regen.test(value);
		},
		message: '该用户名含有非法字符'
	},
	legalName: {// 验证用户名
		validator: function (value) {
			var reg=/^\w{6,}$/;//var reg=/[A-Za-z0-9_\-\u4e00-\u9fa5]+/;
			return reg.test(value);
		},
		message: '用户名只能由6位或以上数字、26个英文字母或者下划线组成'
	},
	legalpwd:{// 验证密码
		validator: function (value) {
			var pwd1=$("#pwd1").val();
			var pwd2=$("#pwd2").val();
			var reg=/^\w{6,}$/;
			return reg.test(value);
		},
		message: '密码只能由6位或以上数字、26个英文字母或者下划线组成'
	},
	samepwd:{// 验证两次密码相同
		validator: function (value) {
			var pwd1=$("#pwd1").val();
			var pwd2=$("#pwd2").val();console.log(pwd1+"----"+pwd2);
			return pwd1==pwd2;
		},
		message: '两次输入的密码不一致'
	}
});