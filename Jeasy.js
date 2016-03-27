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
Jeasy.prototype.getTag = function(tag)
{
	var tags = document.getElementsByTagName(tag);
	for(var i = 0; i < tags.length; i ++)
	{
		this.elements.push(tags[i]);
	}
	return this;
};

// 通过class获取节点对象
Jeasy.prototype.getClass = function(className, id)
{
	var node = null;
	if(arguments.length === 1)
	{
		// 只有一个参数时从document对象中获取节点
		node = document;
	}
	else
	{
		// 传入id值后，从id所属的节点中获取节点
		node = document.getElementById(id);
	}
	var all = node.getElementsByTagName('*');
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
	return this;
};

// 获取节点对象数组中的一个节点对象
Jeasy.prototype.getElement = function(index)
{
	var element = this.elements[index];
	this.elements = [];
	this.elements.push(element);
	return this;
};




// 添加css样式，或者返回css样式值
Jeasy.prototype.css = function(attr, value)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		if(arguments.length===1)
		{
			// return this.elements[i].style[attr];// 这种方法只能获取行间样式值
			if(window.getComputedStyle) //DOM
			{
				return window.getComputedStyle(this.elements[i], null)[attr];
			}
			else if(this.elementsp[i].currentStyle) //IE
			{
				return this.elements[i].currentStyle[attr];
			}
		}
		else
		{
			this.elements[i].style[attr] = value;
		}
	}
	return this;
};

// 添加事件处理程序
Jeasy.prototype.addHander = function(type, hander)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		if(this.elements[i].addEventListener) //DOM
		{
			this.elements[i].addEventListener(type, hander, false);
		}
		else if(this.elements[i].attachEvent) //IE
		{
			this.elements[i].attachEvent('on' + type, hander);
		}
		else
		{
			this.elements[i]['on' + type] = hander;
		}
	}
	return this;
};

// 移除事件处理程序
Jeasy.prototype.rmHander = function(type, hander)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		if(this.elements[i].removeEventListener) //DOM
		{
			this.elements[i].removeEventListener(type, hander, false);
		}
		else if(this.elements[i].detachEvent) //IE
		{
			this.elements[i].detachEvent('on' + type, hander);
		}
		else
		{
			this.elements[i]['on' + type] = null;
		}
	}
	return this;
}

// 设置innerHTML
Jeasy.prototype.html = function(str)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		if(arguments.length===0)
		{
			return this.elements[i].innerHTML;
		}
		else
		{
			this.elements[i].innerHTML = str;
		}
	}
	return this;
};

// 在一个节点上添加一个class
Jeasy.prototype.addClass = function(className)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		// 如果该节点不包含当前class的话才进行添加
		if(!this.elements[i].className.match(new RegExp( '(\s|^)' + className + '(\s|$)') ))
		{
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};

// 删除一个节点的class
Jeasy.prototype.rmClass = function(className)
{
	for(var i = 0; i < this.elements.length; i ++)
	{
		if(!this.elements[i].className.match(new RegExp( '(\s|^)' + className + '(\s|$)') ))
		{
			this.elements[i].className = this.elements[i].className.replace(new RegExp( '(\\s|^)' + className + '(\\s|$)'), '');
		}
	}
	return this;
};


// 向现有的样式表中添加新规则
Jeasy.prototype.addRule = function(num, selectorStr, cssStr, position)
{
	var sheet = document.styleSheets[num];
	if(sheet.insertRule) //DOM
	{
		sheet.insertRule(selectorStr + '{' + cssStr + '}', position);
	}
	else if (sheet.addRule) //IE
	{
		sheet.addRule(selectorStr, cssStr, position);
	}
	return this;
};

// 删除现有样式表中的规则
Jeasy.prototype.rmRule = function(num, index)
{
	var sheet = document.styleSheets[num];
	if(sheet.deleteRule)
	{
		sheet.deleteRule(index);
	}
	else if(sheet.removeRule)
	{
		sheet.removeRule(index);
	}
	return this;
};