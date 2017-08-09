var btnTanmu = $("#btn-tanmu");
btnTanmu.data("switch","off");
btnTanmu.data("pageNo","1");
btnTanmu.data("tanmu",[]);

var TanmuPlayModule = new GModule(btnTanmu,{
	eventName : "click",
	defaultState : "CheckSwitch"
},{
	"CheckSwitch":function(){
		event.preventDefault();
		if(btnTanmu.data("switch") === "on"){
			return "TanmuOff";
		}else{
			return "TanmuOn";
		}
	},
	"TanmuOn":function(){
		$(".tanmu-box").css("display","block");
		btnTanmu.data("switch","on");
		btnTanmu.text("关闭弹幕");
		btnTanmu.css("box-shadow","0 0 8px #c8cccf");
		var tanmus,content;
		
		if(btnTanmu.data("tanmu").length > 0){
			var xxx = function(callback,content){
				TanmuPlayModule.eventGo("GetTanmu&" + btnTanmu.data("pageNo"));
				callback(content);
			}
			var interval = setInterval(function(){
				tanmus = btnTanmu.data("tanmu");
				content = tanmus.shift();
				if(btnTanmu.data("tanmu").length < 3){
					var callbackk = function(content){
						TanmuPlayModule.eventGo("RenderTanmu&" + content.content);
					}
					xxx(callbackk,content);
				}else{
					TanmuPlayModule.eventGo("RenderTanmu&" + content.content);
				}
			},500);
			btnTanmu.data("interval",interval);
		}else{
			TanmuPlayModule.eventGo("GetTanmu&1");
		}
	},
	"GetTanmu":function(pageNo){
		$.ajax({
			type : "get",
			url : "/tanmu/get.do?pageNo=" + pageNo,
			async : true,
			success : function(data) {
				if (data.length > 2) {
					data = JSON.parse(data);
					var tanmus = btnTanmu.data("tanmu");
					for(var t=0; t<data.length; t++){
						tanmus.push(data[t]);
					}
					btnTanmu.data("tanmu",tanmus);
					if(pageNo == 1){
						TanmuPlayModule.eventGo("TanmuOn");
					}
					btnTanmu.data("pageNo",parseInt(pageNo)+1);
				}else{
					clearInterval(btnTanmu.data("interval"));
				}
			}
		})
	},
	"RenderTanmu":function(content){
		var tanmu = $("<span></span>");
		$(".tanmu-box").append(tanmu.text(content));
		tanmu.css("top",Math.floor(Math.random()*90)+"%");
		tanmu.animate({
			"right":"140vw"
		},8000,"linear",function(){
			tanmu.css("display","none");
		});
	},
	"TanmuOff":function(){
		$(".tanmu-box").css("display","none");
		$(".tanmu-box").html(" ");
		btnTanmu.text("打开弹幕");
		btnTanmu.css("box-shadow","none");
		btnTanmu.data("switch","off");
		clearInterval(btnTanmu.data("interval"));
	}
});

//自动播放
setTimeout(function(){
	TanmuPlayModule.eventGo("TanmuOn");
},6000)


//弹幕模块
var TanmuModule = new GModule($("#btn-sent"),{
	eventName : "click",
	defaultState : "CheckInput"
},{
	"CheckInput":function(){
		event.preventDefault();
		var content = $("input").eq(0).val();
		var re=/^\?(.*)(select%20|insert%20|delete%20from%20|count\(|drop%20table|update%20truncate%20|asc\(|mid\(|char\(|xp_cmdshell|exec%20master|net%20localgroup%20administrators|\"|:|net%20user|\|%20or%20)(.*)$/gi;
		if(content==null || content.length==0){
			TanmuModule.eventGo("RenderEmpty");
		}else if(re.test(content)){
			TanmuModule.eventGo("RenderError");
		}else{
			TanmuModule.eventGo("SendTanmu&" + content);
		}
	},
	"RenderEmpty":function(){
		$("input").eq(0).val("");
		alert("输入不能为空");
	},
	"RenderError":function(){
		$("input").eq(0).val("");
		alert("输入含有非法字符，请重新输入");
	},
	"SendTanmu":function(content){
		$.ajax({
			type : "get",
			url : "/tanmu/insert.do?content=" + content,
			async : true,
			contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			success : function(data) {
				if (data != "0") {
					TanmuModule.eventGo("RenderTanmu&"+content);
				} else {
					TanmuModule.eventGo("RenderAccident");
				}
			}
		})
	},
	"RenderTanmu":function(content){
		$("input").eq(0).val("");
		console.log(content);
		var tanmu = $("<span></span>");
		$(".tanmu-box").append(tanmu.text(content));
		tanmu.animate({
			"right":"120%"
		},8000,"linear",function(){
			tanmu.css("display","none");
		});
	},
	"RenderAccident":function(){
		alert("网络不良，发送失败");
	}
});

