; + function(window, document) {

	var logo = function(now) {

		//canvas元素
		this.El = {
			a: document.getElementById("logo-3d"),
			b: document.getElementById("logo-plane"),
			c: document.getElementById("menu"),
			d: document.getElementsByTagName("form")[0]
		};

		//canvas上下文
		this.Elcontext = {
			a: this.El.a.getContext("2d"),
			b: this.El.b.getContext("2d")
		};

		//屏幕大小
		this.screenSize = {
			width: Math.floor(window.innerWidth),
			height: Math.floor(window.innerHeight)
		};

		//初始化方法
		this.init = function(_El, _Elcontext, _screenSize) {
			//自适应屏幕大小
			_El.a.width = _screenSize.width;
			_El.a.height = _screenSize.height;
			_El.b.width = _screenSize.width;
			_El.b.height = _screenSize.height;
			//设置初始偏移量
			_Elcontext.a.translate(Math.floor(_screenSize.width * 1 / 2), Math.floor(_screenSize.height * 7 / 20));
			_Elcontext.b.translate(Math.floor(_screenSize.width * 1 / 2), Math.floor(_screenSize.height * 7 / 20));
			//动画方法
			(function() {
				var lastTime = 0;
				var vendors = ['webkit', 'moz'];
				for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
					window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
					window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
						window[vendors[x] + 'CancelRequestAnimationFrame'];
				}

				if(!window.requestAnimationFrame) {
					window.requestAnimationFrame = function(callback, element) {
						var currTime = new Date().getTime();
						var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
						var id = window.setTimeout(function() {
							callback(currTime + timeToCall);
						}, timeToCall);
						lastTime = currTime + timeToCall;
						return id;
					};
				}
				if(!window.cancelAnimationFrame) {
					window.cancelAnimationFrame = function(id) {
						clearTimeout(id);
					};
				}
			}());
		}(this.El, this.Elcontext, this.screenSize);

		//绘图方法
		this.draw = function(_Elcontext, _screenSize, _drawData) {
			//清除画布
			_Elcontext.a.clearRect(-_screenSize.width * 1 / 2, -_screenSize.height * 1 / 2, _screenSize.width, _screenSize.height);

			//创建渐变
			var g2 = _Elcontext.a.createLinearGradient(-_drawData.radiu, -_drawData.radiu, _drawData.radiu, _drawData.radiu);
			g2.addColorStop(0.1, 'rgb(129,146,180)');
			g2.addColorStop(1, 'rgb(20,39,66)');

			/*最外层圆环*/
			/*纯色*/
			_Elcontext.b.save();
			_Elcontext.b.beginPath();
			_Elcontext.b.arc(0, 0, _drawData.radiu, 0, Math.PI * 2, true);
			_Elcontext.b.strokeStyle = "rgb(129,146,180)";
			_Elcontext.b.lineWidth = _drawData.width;
			_Elcontext.b.closePath();
			_Elcontext.b.stroke();

			/*最外层圆环*/
			/*蒙版*/
			_Elcontext.b.restore();
			_Elcontext.b.save();
			_Elcontext.b.beginPath();
			_Elcontext.b.rotate(Math.PI * _drawData.rotation * 3);
			_Elcontext.b.globalCompositeOperation = 'destination-out';
			_Elcontext.b.fillRect(_drawData.radiu - _drawData.width, -_drawData.Rheight, _screenSize.height * 0.26, _drawData.Rheight);
			_Elcontext.b.closePath();
			_Elcontext.b.restore();

			/*二层圆环*/
			/*纯色*/
			_Elcontext.b.restore();
			_Elcontext.b.save();
			_Elcontext.b.beginPath();
			_Elcontext.b.arc(0, 0, _drawData.radiu * 0.85, 0, Math.PI * 2, true);
			_Elcontext.b.strokeStyle = "rgb(129,146,180)";
			_Elcontext.b.lineWidth = _drawData.width * 3.5;
			_Elcontext.b.closePath();
			_Elcontext.b.stroke();

			/*二层圆环*/
			/*蒙版*/
			_Elcontext.b.restore();
			_Elcontext.b.save();
			_Elcontext.b.beginPath();
			_Elcontext.b.rotate(Math.PI * _drawData.rotation);
			_Elcontext.b.globalCompositeOperation = 'destination-out';
			_Elcontext.b.fillRect(_drawData.radiu * 0.82 - _drawData.width * 3.5, -_drawData.Rheight, _screenSize.height * 0.06, _drawData.Rheight);
			_Elcontext.b.closePath();
			_Elcontext.b.restore();

			/*中心圆环*/
			/*纯色*/
			_Elcontext.b.restore();
			_Elcontext.b.save();
			_Elcontext.b.beginPath();
			_Elcontext.b.arc(0, 0, _drawData.radiu * 0.5, 0, Math.PI * 2, true);
			_Elcontext.b.strokeStyle = "rgb(129,146,180)";
			_Elcontext.b.lineWidth = _drawData.width * 8;
			_Elcontext.b.closePath();
			_Elcontext.b.stroke();

			/*中心圆环*/
			/*蒙版*/
			_Elcontext.b.restore();
			_Elcontext.b.save();
			_Elcontext.b.beginPath();
			_Elcontext.b.globalCompositeOperation = 'destination-out';
			_Elcontext.b.fillRect(0, -_drawData.Rheight, _screenSize.height * 0.15, _drawData.Rheight);
			_Elcontext.b.closePath();

			/*半圆填充物*/
			/*纯色*/
			_Elcontext.b.restore();
			_Elcontext.b.save();
			_Elcontext.b.beginPath();
			_Elcontext.b.fillStyle = "rgb(129,146,180)";
			_Elcontext.b.arc(0, _drawData.Rheight + 1, _drawData.radiu * 0.5, 0, Math.PI * 1, false);
			_Elcontext.b.closePath();
			_Elcontext.b.fill();
			_Elcontext.b.restore();

			/*最外层圆环*/
			/*描边*/
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu, 0, Math.PI * 2, true);
			_Elcontext.a.strokeStyle = "#FFFFFF";
			_Elcontext.a.lineWidth = _drawData.width;
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*最外层圆环*/
			/*阴影*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu, 0, Math.PI * 2, true);
			_Elcontext.a.lineWidth = _drawData.width;
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.shadowOffsetX = 3;
			_Elcontext.a.shadowOffsetY = 3;
			_Elcontext.a.shadowBlur = 5;
			_Elcontext.a.shadowColor = 'rgba(0, 0, 0, 0.5)';
			_Elcontext.a.stroke();

			/*最外层圆环*/
			/*渐变色*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu, 0, Math.PI * 2, true);
			_Elcontext.a.lineWidth = _drawData.width;
			_Elcontext.a.strokeStyle = g2;
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*最外层圆环*/
			/*蒙版*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.rotate(Math.PI * _drawData.rotation * 3);
			_Elcontext.a.globalCompositeOperation = 'destination-out';
			_Elcontext.a.fillRect(0, -_drawData.Rheight, _screenSize.height * 0.26, _drawData.Rheight);
			_Elcontext.a.closePath();
			_Elcontext.a.restore();

			/*最外层圆环*/
			/*蒙版阴影*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.rotate(Math.PI * _drawData.rotation * 3);
			_Elcontext.a.moveTo(_drawData.radiu - _drawData.width * 0.5, -_drawData.Rheight);
			_Elcontext.a.lineTo(_drawData.radiu + _drawData.width * 0.5, -_drawData.Rheight);
			_Elcontext.a.lineWidth = 1;
			_Elcontext.a.closePath();
			_Elcontext.a.shadowOffsetX = 4;
			_Elcontext.a.shadowOffsetY = 3;
			_Elcontext.a.shadowBlur = 5;
			_Elcontext.a.shadowColor = 'rgba(0, 0, 0, 0.8)';
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*二层圆环*/
			/*描边*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu * 0.85, 0, Math.PI * 2, true);
			_Elcontext.a.strokeStyle = "#FFFFFF";
			_Elcontext.a.lineWidth = _drawData.width * 3.5 + 0.5;
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*二层圆环*/
			/*阴影*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu * 0.85, 0, Math.PI * 2, true);
			_Elcontext.a.lineWidth = _drawData.width * 3.5;
			_Elcontext.a.closePath();
			_Elcontext.a.shadowOffsetX = 4;
			_Elcontext.a.shadowOffsetY = 4;
			_Elcontext.a.shadowBlur = 4;
			_Elcontext.a.shadowColor = 'rgba(0, 0, 0, 0.5)';
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*二层圆环*/
			/*渐变色*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu * 0.85, 0, Math.PI * 2, true);
			_Elcontext.a.strokeStyle = g2;
			_Elcontext.a.lineWidth = _drawData.width * 3.5;
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*二层圆环*/
			/*蒙版*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.rotate(Math.PI * _drawData.rotation);
			_Elcontext.a.globalCompositeOperation = 'destination-out';
			_Elcontext.a.fillRect(0, -_drawData.Rheight, _screenSize.height * 0.193, _drawData.Rheight);
			_Elcontext.a.closePath();
			_Elcontext.a.restore();

			/*二层圆环*/
			/*蒙版阴影*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.rotate(Math.PI * _drawData.rotation);
			_Elcontext.a.moveTo(_drawData.radiu * 0.85 - _drawData.width * 1.75, -_drawData.Rheight);
			_Elcontext.a.lineTo(_drawData.radiu * 0.85 + _drawData.width * 1.75, -_drawData.Rheight);
			_Elcontext.a.lineWidth = 1;
			_Elcontext.a.closePath();
			_Elcontext.a.shadowOffsetX = 4;
			_Elcontext.a.shadowOffsetY = 3;
			_Elcontext.a.shadowBlur = 5;
			_Elcontext.a.shadowColor = 'rgba(0, 0, 0, 1)';
			_Elcontext.a.globalAlpha = _drawData.Malph1;
			_Elcontext.a.stroke();

			/*二层圆环*/
			/*蒙版阴影之二*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.rotate(Math.PI * _drawData.rotation);
			_Elcontext.a.moveTo(_drawData.radiu * 0.85 - _drawData.width * 1.75, 0);
			_Elcontext.a.lineTo(_drawData.radiu * 0.85 + _drawData.width * 1.75, 0);
			_Elcontext.a.lineWidth = 1;
			_Elcontext.a.closePath();
			_Elcontext.a.shadowOffsetX = 4;
			_Elcontext.a.shadowOffsetY = 3;
			_Elcontext.a.shadowBlur = 5;
			_Elcontext.a.shadowColor = 'rgba(0, 0, 0, 1)';
			_Elcontext.a.globalAlpha = _drawData.Malph2;
			_Elcontext.a.stroke();

			/*中心圆环*/
			/*描边*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu * 0.5, 0, Math.PI * 2, true);
			_Elcontext.a.strokeStyle = "#FFFFFF";
			_Elcontext.a.lineWidth = _drawData.width * 8 + 1;
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*中心圆环*/
			/*阴影*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu * 0.5, 0, Math.PI * 2, true);
			_Elcontext.a.lineWidth = _drawData.width * 8;
			_Elcontext.a.closePath();
			_Elcontext.a.shadowOffsetX = 5;
			_Elcontext.a.shadowOffsetY = 5;
			_Elcontext.a.shadowBlur = 5;
			_Elcontext.a.shadowColor = 'rgba(0, 0, 0, 0.5)';
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*中心圆环*/
			/*渐变色*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.arc(0, 0, _drawData.radiu * 0.5, 0, Math.PI * 2, true);
			_Elcontext.a.strokeStyle = g2;
			_Elcontext.a.lineWidth = _drawData.width * 8;
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*中心圆环*/
			/*蒙版*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.globalCompositeOperation = 'destination-out';
			_Elcontext.a.fillRect(0, -_drawData.Rheight, _screenSize.height * 0.15, _drawData.Rheight);
			_Elcontext.a.closePath();

			/*中心圆环*/
			/*蒙版阴影*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.moveTo(_drawData.radiu * 0.5 - _drawData.width * 4, -_drawData.Rheight);
			_Elcontext.a.lineTo(_drawData.radiu * 0.5 + _drawData.width * 4, -_drawData.Rheight);
			_Elcontext.a.lineWidth = 1;
			_Elcontext.a.closePath();
			_Elcontext.a.shadowOffsetX = 4;
			_Elcontext.a.shadowOffsetY = 3;
			_Elcontext.a.shadowBlur = 5;
			_Elcontext.a.shadowColor = 'rgba(0, 0, 0, 1)';
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.stroke();

			/*半圆填充物*/
			/*渐变*/
			_Elcontext.a.restore();
			_Elcontext.a.save();
			_Elcontext.a.beginPath();
			_Elcontext.a.fillStyle = g2;
			_Elcontext.a.arc(0, _drawData.Rheight, _drawData.radiu * 0.5, 0, Math.PI * 1, false);
			_Elcontext.a.closePath();
			_Elcontext.a.globalAlpha = _drawData.Malph;
			_Elcontext.a.fill();
			_Elcontext.a.restore();
		};

		//加载静态logo
		this.loadLogo = function() {
			//画图参数
			var drawData = {
				radiu: Math.floor(this.screenSize.height * 0.2), //半径
				width: Math.floor(this.screenSize.height * 0.01), //宽度
				Rheight: Math.floor(this.screenSize.height * 0.015), //蒙版宽度
				rotation: 0.5, //旋转角度
				Malph: 1, //纯色透明度
				Malph1: 0, //阴影透明度
				Malph2: 0 //渐变透明度
			};
			this.draw(this.Elcontext, this.screenSize, drawData);
			this.El.a.style.opacity = 1;
			this.El.c.style.opacity = 1;
			this.El.d.style.opacity = 1;
			document.getElementById("header").style.opacity = 1;
			document.getElementById("back").style.opacity = 0;
			var btn = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
			for(var i = 0; i < btn.length; i++) {
				btn[i].style.margin = '0 4vw';
				btn[i].style.textShadow = '1px 1px 1px #000000';
				btn[i].style.letterSpacing = "5px";
			}
		};

		//加载动态logo
		this.loadLogoAnimation = function() {
			//绘图参数
			var drawData = {
				radiu: Math.floor(this.screenSize.height * 0.2), //半径
				width: Math.floor(this.screenSize.height * 0.01), //宽度
				Rheight: Math.floor(this.screenSize.height * 0.015), //蒙版宽度
				perrotation: Math.floor(this.screenSize.height * 0.2) / 6000 / Math.PI, //旋转加速度
				rotation: 0, //旋转角度
				Malph: 1, //纯色透明度
				Malph1: 1, //阴影透明度
				Malph2: 1, //渐变透明度
			};

			var El = this.El;
			var Elcontext = this.Elcontext;
			var screenSize = this.screenSize;
			var draw = this.draw;

			El.a.style.animation = "scale1 2500ms cubic-bezier(0,0.3,0.3,1)";
			El.b.style.animation = "scale1 2500ms cubic-bezier(0,0.3,0.3,1)";
			
			//计时
			var timing = 0;
			var startTime = new Date().getTime();
			
			var upload = function() {

				draw(Elcontext, screenSize, drawData);
				var curTime = new Date().getTime();
				timing = curTime - startTime;
				
				//2.5s后执行拉镜动画
				if(timing > 2500) {
					//缩放
					El.a.style.animation = "scale2 2s cubic-bezier(0,0,0.3,1)";
					El.b.style.animation = "scale2 2s cubic-bezier(0,0,0.3,1)";
					//平面图形3D化
					El.a.style.opacity = 1;
					El.c.style.opacity = 1;
					El.d.style.opacity = 1;
					//菜单展开
					document.getElementById("header").style.opacity = 1;
					document.getElementById("back").style.opacity = 0;
					var nav = document.getElementsByTagName("nav")[0];
					var btn = nav.getElementsByTagName("a");
					for(var i = 0; i < btn.length; i++) {
						btn[i].style.margin = '0 4vw';
						btn[i].style.textShadow = '1px 1px 1px #000000';
						btn[i].style.letterSpacing = "5px";
					}
					nav.setAttribute("animation-flag", "1");
				}
				
				//2s后执行旋转动画
				if(timing > 2000) {
					if(drawData.rotation < 1 / 2) {
						drawData.rotation += drawData.perrotation;
					}
				}
				
				//3s后开始缓动
				if(timing > 2000 && drawData.perrotation > 0.002){
					drawData.perrotation = drawData.perrotation*0.982;
				}
				requestAnimationFrame(upload);
			}
			requestAnimationFrame(upload)
		};

	}

	window.loadLogo = function() {
		return new logo().loadLogo();
	};

	window.loadLogoAnimation = function() {
		return new logo().loadLogoAnimation();
	}

}(window, document);