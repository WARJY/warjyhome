; + function(window, document) {

	var FullWindow = function(_el, _window) {
		//触发元素
		this.el = function(_el) {
			if(_el instanceof jQuery) {
				return _el;
			} else {
				return $(_el);
			}
		}(_el);
		//窗口元素
		this.windows = $(_window);
		//图片元素对象
		this.img = {
				//低质量图片
				lowQ:_window.getElementsByClassName("img-lowQ")[0],
				//高质量图片
				highQ:_window.getElementsByClassName("img-highQ")[0]
		}
		//标题元素对象
		var titleBox = $(_window.getElementsByClassName("remark-box")[0]);
		this.title = {
				//标题盒子
				box:titleBox,
				//标题
				title:titleBox.find("h1").eq(0),
				//备注
				remark:titleBox.find("p").eq(0)
		}
		//按钮元素对象
		this.btn = {
				//返回按钮
				ret:$(_window.getElementsByClassName("btn-return")[0]),
				//图片按钮盒子
				img:$(_window.getElementsByClassName("btn-full")[0]),
				//上一张
				left:$(".icon-chevron-left").eq(0),
				//下一张
				right:$(".icon-chevron-right").eq(0)
		}
		//计算图片大小
		this.getImgSize = function(_img) {
				//屏幕长宽比
				var screenPropotion = window.innerWidth / window.innerHeight;
				//图片长宽比
				var imgPropotion = _img.naturalWidth / _img.naturalHeight;
				//设备像素比
				var dpr = window.devicePixelRatio;
				if(window.innerWidth >= 1300 || dpr >= 2){
					return imgPropotion>screenPropotion?"100vw " + 100/imgPropotion+"vw" + " @3x":100*imgPropotion+"vh " + "100vh @3x";
				}else{
					return imgPropotion>screenPropotion?"100vw " + 100/imgPropotion+"vw" + " @2x":100*imgPropotion+"vh " + "100vh @2x";
				}
			}
		//初始化
		this.init = function(_el, _window, _img, _title, _btn, _getImgSize) {
			var rectPosition = "";
			//为图片添加事件
			_el.click(function(event) {
					//事件源
					var targetEl = event.target;
					//位置及大小
					rectPosition = targetEl.getBoundingClientRect();
					//初始化窗口
					_window.css({
						"width":rectPosition.width+"px",
						"height":rectPosition.height+"px",
						"top":rectPosition.top+"px",
						"left":rectPosition.left+"px",
						"display":"block",
						"z-index":"99"
					});
					//窗口放大
					_window.animate({
						"width": "100%",
						"height": "100vh",
						"top": "0",
						"left": "0"
					}, 800, "swing");
					//初始化原图
					_img.lowQ.src = targetEl.src.replace("http://127.0.0.1:8020/warjy", "..");
					//计算大图大小
					var imgSize = _getImgSize(_img.lowQ).split(" ");
					$(_img.lowQ).css({
						"width":rectPosition.width,
						"height":rectPosition.height,
						"display":"inline-block"
					});
					//原图放大
					$(_img.lowQ).animate({
						"width":imgSize[0],
						"height":imgSize[1],
						"top":"0",
						"left":"0",
						"bottom":"0",
						"right":"0"
					}, 800, "swing",function(){
						//显示高质量图片
						$(_img.highQ).css({
							"width":imgSize[0],
							"height":imgSize[1],
							"top":"0",
							"left":"0",
							"bottom":"0",
							"right":"0",
							"z-index":"100"
						});
						_img.highQ.src = _img.lowQ.src.replace("@1x",imgSize[2]);
						_img.highQ.setAttribute("data-id",targetEl.getAttribute("data-id"));
						$(_img.highQ).fadeIn(function(){
							$(_img.lowQ).css("display","none");
						});
					});
					//显示按钮
					_btn.ret.fadeIn();
					_btn.img.fadeIn();
					//显示标题
					_title.title.html(targetEl.getAttribute("data-title"));
					_title.remark.html(targetEl.getAttribute("data-remarks"));
					_title.box.fadeIn();
					//锁定滚动
					$("body").attr("onmousewheel", "return false");
					//保存位置数据
					_btn.ret.data("position", rectPosition);
				})
			//为返回按钮添加事件
			if(_btn.ret.data("have event") != "yes") {
				_btn.ret.click(function() {
					//获取位置数据
					var positions = _btn.ret.data("position");
					//隐藏按钮
					_btn.ret.fadeOut();
					_btn.img.fadeOut();
					//隐藏标题
					_title.box.fadeOut();
					//高质量图片缩小
					$(_img.highQ).animate({
						"width": positions.width,
						"height": positions.height
					}, 800, "swing");
					//窗口缩小
					$(_window).animate({
						"width": positions.width,
						"height": positions.height,
						"left": positions.left,
						"top": positions.top,
					}, 800, "swing", function() {
						//隐藏窗口和图片
						_window.css("display", "none");
						$(_img.highQ).css("display","none");
					});
					//恢复滚动
					$("body").attr("onmousewheel", "return true");
					//添加事件标记
					$(this).data("have event", "yes");
				})
			}
			
		}(this.el, this.windows, this.img, this.title, this.btn, this.getImgSize);
	}
	
	window.FullWindow = function(_el, _window) {
		return new FullWindow(_el, _window);
	}
	
}(window, document)