window.onload = function() {
	//加载移动设置和图标
	loadMobileSetting("");
	//主体内容
	var imgBox = $("main").eq(0);
	//摸态窗口中的视频
	var thisVideo = document.getElementById("madel").getElementsByTagName("video")[0];
	//摸态窗口中的备注
	var remark = $("#madel label").eq(0);
	//灰色遮罩层
	var gray = $("#gray");
	//图片容器
	var mainBox = $("#main");
	//摸态窗口
	var madelBox = $("#madel");
	//获取屏幕大小
	var fullClass = window.screen.width > window.screen.height ? "img-full-cross" : "img-full-vertical";
	//执行文字动画
	$(".title-box-off").eq(0).addClass("title-box");
	
	//添加点击事件------------------------------------------------------------------------------------
	mainBox.children().click(function(event) {
		//事件源
		var targetEl = event.target;
		//加载当前图片
		thisVideo.src = targetEl.getAttribute("data-video").replace("http://127.0.0.1:8020/warjy", "..");
		//渲染位置
		var rectPosition = targetEl.getBoundingClientRect();
		madelBox.css("left", rectPosition.left + "px");
		madelBox.css("top", rectPosition.top + "px");
		madelBox.css("width", targetEl.width + "px");
		madelBox.css("height", targetEl.height + "px");
		//遮罩层淡入
		gray.fadeIn();
		//背景模糊
		mainBox.addClass("blur");
		//摸态窗口淡入
		madelBox.fadeIn(200);
		//摸态窗口缩放
		madelBox.addClass(fullClass);
		//添加备注
		remark.html(targetEl.getAttribute("data-remarks"));
		//禁用滚动
		$("body").attr("onmousewheel", "return false");
		gray.click(function(event) {
			madelBox.removeClass(fullClass);
			setTimeout(
				function() {
					thisVideo.pause();
					gray.fadeOut();
					mainBox.removeClass("blur");
					madelBox.fadeOut();
					$("body").attr("onmousewheel", "return true");
				}, 1000
			);
		});
	})
	
	//滚动加载
	$(window).on("scroll", function(){
		if($(window).scrollTop() == ($(document).height() - $(window).height()) && $(this).data("more?") != 0) {
			var pageNo = $("main").eq(0).attr("data-page");
			$.ajax({
				type : "get",
				url : "/static/videos.do?pageNo=" + pageNo,
				async : true,
				success : function(data) {
					if (data != "0" && data.length > 2) {
						var mainBox = $("main").eq(0);
						mainBox.attr("data-page", parseInt(pageNo) + 1);
						var content = "";
						data = JSON.parse(data);
						for(var i = 0; i < data.length; i++) {
							content += '<section>';
							content += '<img src="' + data[i].face + '"' + 'data-video="' + data[i].src + '" data-remarks="' + data[i].remarks + '"/>';
							content += '<label>';
							content += data[i].title;
							content += '</label>';
							content += '</section>';
						}
						mainBox.append(content);
					} else {
						var content = "";
						content += '<b>没有更多了 咕~~(╯﹏╰)</b>';
						content += '<article>';
						content += '来自：<a href="http://www.makeiot.cn/">美客物联团队</a> ';
						content += '<img src="../image/myQQ.png" />';
						content += '<p>QQ/微信：705282892</p>';
						content += '<p>邮箱：gcc705282892@hotmail.com</p>';
						content += '我的B站主页：<a href="http://space.bilibili.com/5623845/#!/">http://space.bilibili.com/5623845/#!/</a>';
						content += '</article>';
						$("footer").append(content);
						$(window).data("more?",0)
					}
				}
			});
		}
	});
	
	//滚动动画
	$(window).on("scroll", function(){
		if($(window).scrollTop() > 0) {
			//导航栏变化
			$("header").addClass("hascolor");
			//背景图片变化
			$(".img-back").css("background-position-y", "bottom");
			$(".arrow-down").css("opacity", 0);
		} else {
			$("header").removeClass("hascolor");
			$(".img-back").css("background-position-y", "0");
			$(".arrow-down").css("opacity", 1);
		}
	});

}
