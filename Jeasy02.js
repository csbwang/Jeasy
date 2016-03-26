/*
实现连缀，如:$().getId('head').css('color', 'red');
使用构造函数创建对象，在对象原型中添加共有方法
//*/

// 使用这些方法是不需要每次都new 一个Jeasy对象，直接使用$()即可
var $ = function(){
	return new Jeasy();
};

function Jeasy()
{
	// 把返回的节点保存在一个属性数组里
	this.elements = [];
}

// 通过Id获取节点对象
Jeasy.prototype.getId = function(id)
{
	this.elements.push(document.getElementById(id));
	// 因为要实现连缀，所以每个方法都要返回这个对象本身
	return this; 
};

// 通过name获取节点对象
Jeasy.prototype.getName = function(name)
{
	var names = document.getElementsByName(name);
	for(var i = 0; i < names.length; i ++)
	{
		this.elements.push(names[i]);
	}
	return this;
};

// 通过标签名获取节点对象
Jeasy.prototype.getTagName = function(tag)
{
	var tags = document.getElementsByTagName(tag);
	for(var i = 0; i < tags.length; i ++)
	{
		this.elements.push(tags[i]);
	}
	return this;
};

// 通过class获取节点对象
Jeasy.prototype.getClassName = function(className)
{
	var all = document.getElementsByTagName('*');
	for(var i = 0; i < all.length; i ++)
	{
		var classNames = all[i].className.split(' ');
		for(var j = 0; j< classNames.length; j ++)
		{
			if(classNames[j] === className)
			{
				this.elements.push(all[i]);
				break;
			}
		}
	}
};

// 添加css样式
Jeasy.prototype.css = function(attr, value)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		this.elements[i].style[attr] = value;
	}
	return this;
}

// 添加事件处理程序
Jeasy.prototype.addHander = function(type, hander)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		if(this.elements[i].addEventListener)
		{
			this.elements[i].addEventListener(type, hander, false);
		}
		else if(this.elements[i].attachEvent)
		{
			this.elements[i].attachEvent('on' + type, hander);
		}
		else
		{
			this.elements[i]['on' + type] = hander;
		}
	}
	return this;
}

// 设置innerHTML
Jeasy.prototype.html = function(str)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		this.elements[i].innerHTML = str;
	}
	return this;
}