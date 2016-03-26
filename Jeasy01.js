// 元素获取
var Jeasy = {
	getId : function(id)
	{
		return document.getElementById(id);
	},

	getName : function(name)
	{
		return document.getElementsByName(name);
	},

	getTagName : function(tag)
	{
		return document.getElementsByTagName(tag);
	},

	getClassName: function(className)
	{
		// 有些浏览器不支持getElementsByClassName，所以这里完全自己实现
		var all = document.getElementsByTagName('*');
		var elements = new Array();
		//  一个className可能运用于多个元素
		for(var i = 0; i < all.length; i ++)
		{
			// 一个元素也可能有多个className
			var classNames = all[i].className.split(' ');
			for(var j = 0; j < classNames.length; j ++)
			{
				if(classNames[j]===className)
				{
					elements.push(all[i]);
					break;
				}
			}
		}
		return elements;
	}
};