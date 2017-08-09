//图片按钮模块
var ImgBtnModule = new GModule($(".btn-full i"), {
	eventName : "click",
	defaultState : "CheckClick"
}, {
	"CheckClick" : function() {
		var leftBtn = $(".icon-chevron-left");
		if (event.target == leftBtn[0]) {
			return "GetImg&" + (parseInt($(".img-highQ").attr("data-id")) - 1);
		} else {
			return "GetImg&" + (parseInt($(".img-highQ").attr("data-id")) + 1);
		}
	},
	"GetImg" : function(id) {
		if (id) {
			var dpr = window.devicePixelRatio;
			if (window.innerWidth >= 1300 || dpr >= 2) {
				dpr = "x3";
			} else {
				dpr = "x2";
			}
			$.ajax({
				type : "get",
				url : "/static/img.do?id=" + id + "&dpr=" + dpr,
				async : true,
				success : function(data) {
					ImgBtnModule.eventGo("RenderImg&" + data);
				}
			})
		}
	},
	"RenderImg" : function(data) {
		if (data != 0 && data.length >2) {
			data = JSON.parse(data)[0];
			var imgHighQ = document.getElementsByClassName("img-highQ")[0];
			imgHighQ.src = data.src;
			$(imgHighQ).attr("data-id", data.id);
			$(".remark-box h1").html(data.title);
			$(".remark-box p").html(data.remarks);
			var screenPropotion = window.innerWidth / window.innerHeight;
			var dpr = window.devicePixelRatio;
			imgHighQ.onload = function() {
				var imgPropotion = imgHighQ.naturalWidth
						/ imgHighQ.naturalHeight;
				$(imgHighQ).animate(
						{
							"width" : imgPropotion > screenPropotion ? "100vw"
									: 100 * imgPropotion + "vh",
							"height" : imgPropotion > screenPropotion ? 100
									/ imgPropotion + "vw" : "100vh"
						}, 800, "swing");
			}
		}
	}
});

//瀑布流模块
var MassoryModule = new GModule(
		$(window),
		{
			// 事件控制器
			eventName : "scroll",
			defaultState : "CheckScroll"
		},
		{
			// 状态控制器
			"CheckScroll" : function() {
				if ($(window).scrollTop() == ($(document).height() - $(window)
						.height())) {
					var pageNo = $("main").eq(0).attr("data-page");
					return "GetImgs&" + pageNo;
				}
			},
			"GetImgs" : function(pageNo) {
				if (pageNo) {
					var responseDatas = "";
					$("main").eq(0).attr("data-page", parseInt(pageNo) + 1);
					$.ajax({
						type : "get",
						url : "/static/imgs.do?pageNo=" + pageNo
								+ "&dpr=x1",
						async : true,
						success : function(data) {
							if (data != "0" && data.length > 2) {
								MassoryModule.eventGo("RenderImgs&" + data);
							} else {
								MassoryModule.eventGo("RenderNone&" + "0");
							}
						}
					});
				}
			},
			"RenderImgs" : function(imgDatas) {
				imgDatas = JSON.parse(imgDatas);
				var sections = $("main section");
				var content, minheight, heights;
				var contents = [];
				// 移动设备
				if (window.innerWidth <= 768) {
					for (var i = 0, imgLength = imgDatas.length; i < imgLength; i++) {
						content = document.createElement("img");
						content.src = imgDatas[i].src;
						content.setAttribute("data-id", imgDatas[i].id);
						content.setAttribute("data-title", imgDatas[i].title);
						content.setAttribute("data-remarks",imgDatas[i].remarks);
						sections.eq(0).append(content);
						contents.push(content);
					}
					// 其他设备
				} else {
					for (var i = 0, imgLength = imgDatas.length; i < imgLength; i++) {
						minheight = "";
						heights = [];
						sections.each(function() {
							heights.push(parseInt($(this).css("height")));
						});
						if (heights[0] < heights[1] && heights[0] < heights[2]) {
							minheight = sections.eq(0);
						} else if (heights[1] < heights[2]) {
							minheight = sections.eq(1);
						} else {
							minheight = sections.eq(2);
						}
						;
						content = document.createElement("img");
						content.src = imgDatas[i].src;
						content.setAttribute("data-id", imgDatas[i].id);
						content.setAttribute("data-title", imgDatas[i].title);
						content.setAttribute("data-remarks",
								imgDatas[i].remarks);
						$(minheight).append(content);
						contents.push(content);
					}
				}
				var fullwindows = document.getElementById("full-window");
				// 激活弹窗
				FullWindow(contents, fullwindows);
			},
			"RenderNone" : function(message) {
				if (message === "0") {
					var content = "";
					content += '<b>没有更多了 咕~~(╯﹏╰)</b>';
					content += '<article>';
					content += '来自：<a href="http://www.makeiot.cn/">美客物联团队</a> ';
					content += '<img src="../image/myQQ.png" />';
					content += '<p>QQ/微信：705282892</p>';
					content += '<p>邮箱：gcc705282892@hotmail.com</p>';
					content += '我的B站主页：<a href="http://space.bilibili.com/5623845/#!/">http://space.bilibili.com/5623845/#!/</a>';
					content += '</article>';
					$("footer").eq(0).append(content);
					MassoryModule.eventOff();
				}
			}
		});



// 文字动画
$(".title-box-off").eq(0).addClass("title-box");
// 滚动事件
$(window).on("scroll", function() {
	if ($(window).scrollTop() > 0) {
		// 导航栏变化
		$("header").addClass("hascolor");
		// 背景图片变化
		$(".img-back").css("background-position-y", "bottom");
	} else {
		$("header").removeClass("hascolor");
		$(".img-back").css("background-position-y", "0");
	}
});
loadMobileSetting();
