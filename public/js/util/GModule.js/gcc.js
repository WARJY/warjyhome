; + function(window, document) {

	var GModule = function(eventEl, eventController, statusController) {
		console.log("this is GModule");

		//过滤事件元素
		var filterEl = function(_eventEl) {
			if(_eventEl instanceof jQuery) {
				return _eventEl;
			} else {
				return $(_eventEl);
			}
		};
		//解析状态控制器
		var initStatus = function(_statusController) {
			var status = [];
			for(var x in _statusController) {
				status.push(x);
			}
			return status;
		};
		//解析状态方法
		var initStatusFuns = function(_statusController) {
			var statuFuns = [];
			for(var x in _statusController) {
				statuFuns.push(_statusController[x]);
			}
			return statuFuns;
		};

		//事件元素
		this.eventEl = filterEl(eventEl);
		//事件控制器元素
		this.eventController = {
			//事件名
			eventName: eventController.eventName,
			//默认状态
			defaultState: eventController.defaultState
		};
		//状态控制器
		this.statusController = statusController;
		//状态数组
		this.status = initStatus(this.statusController);
		//状态方法数组
		this.statuFuns = initStatusFuns(this.statusController);
		//返回状态方法
		this.findFun = function(_statuss, _statusFuns, _thisStatus) {
			var s;
			var length = _statuss.length;
			for(s = 0; s < length; s++) {
				if(_thisStatus === _statuss[s]) {
					return _statusFuns[s];
				}
			}
		}
		//绑定事件
		this.eventEl.on(this.eventController.eventName, {
			"defaultStatus": this.eventController.defaultState,
			"status": this.status,
			"statuFuns": this.statuFuns,
			"findFun":this.findFun
		}, addEvent);
		//开始状态循环
		this.eventGo = function(message) {
			var results, resultFun;
			results = message.split("&");
			//如果带有返回消息
			if(results[1]) {
				resultFun = this.findFun(this.status, this.statuFuns, results[0]);
				results = resultFun(results[1]);
			} else {
				resultFun = this.findFun(this.status, this.statuFuns, message);
				results = resultFun(message);
			}
			//如果有返回值则递归否则停止
			if(results) {
				eventGo(results);
			}
		}
		//解除事件绑定
		this.eventOff = function() {
			this.eventEl.off(this.eventController.eventName, addEvent);
		}

		//事件回调函数
		function addEvent(event) {
			//开始状态循环
			function eventGo(message) {
				var results, resultFun;
				results = message.split("&");
				//如果带有返回消息
				if(results[1]) {
					resultFun = event.data.findFun(event.data.status, event.data.statuFuns, results[0]);
					results = resultFun(results[1]);
				} else {
					resultFun = event.data.findFun(event.data.status, event.data.statuFuns, message);
					results = resultFun(message);
				}
				//如果有返回值则递归否则停止
				if(results) {
					eventGo(results);
				}
			}
			eventGo(event.data.defaultStatus);
		}

	}

	window.GModule = function(eventEl, eventController, statusController) {
		return new GModule(eventEl, eventController, statusController);
	};

}(window, document);