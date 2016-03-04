function move(obj, json, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
	{
		var stop=true;
		// 使用json进行多个值的变化，fn回调行数实现链式运动
		for(var attr in json)
		{
			// 获取当前某个属性的值
			var iValue=0;
			// 透明度做单独处理
			if(attr=='opacity')
			{
				// js中有些浮点数是不精确的，如 0.7
				iValue=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else
			{
				iValue=parseInt(getStyle(obj, attr));
			}
			// 设置运动速度
			var iSpeed=(json[attr]-iValue)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			// 检测停止
			if(iValue!=json[attr])
			{
				stop=false;
			}
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iValue+iSpeed)+')';
				obj.style.opacity=(iValue+iSpeed)/100;
			}else
			{
				obj.style[attr]=iValue+iSpeed+'px';
			}
		}
		// 全部属性运动到目标值结束计时器
		if(stop)
		{
			clearInterval(obj.timer);
			if(fn)
			{
				fn();
			}
		}
	},30);
}

function getStyle(obj, attr){
	// 返回的值时数字型的字符串
	if(obj.currentStyle){
		return obj.currentStyle();
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}