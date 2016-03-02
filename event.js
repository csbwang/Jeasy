var eventUtil={
	// 添加事件
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
	},
	// 删除事件
	removeHandler:function(element,type,handler){
		if(element.addEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=null;
		}
	},
	// 获取事件对象
	getEvent:function(event){
		return event?event:window.event;
	},
	// 获取事件类型
	getType:function(event){
		return event.type;
	},
	// 获取事件所在的元素
	getElement:function(event){
		return event.target || event.srcElement;
	},
	// 取消事件的默认行为
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	// 阻止事件冒泡
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
}