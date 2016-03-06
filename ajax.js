function ajax(url, fnSucc, fnFaild)
{
	// 1. 创建Ajax对象
	// js里使用没有定义的变量会报错，但是使用一个没有定义的属性返回undefined
	if(window.XMLHttpRequest)
	{
		var oAjax=XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");//兼容IE6
	}

	// 2. 连接服务器
	// open(方法，文件名，异步传输)
	oAjax.open('GET', url, true);

	// 3. 发送请求
	oAjax.send();

	// 4. 接收返回值
	oAjax.onreadystatechange=function()
	{
		// readyState判断浏览器和服务器进行的情况
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				// 成功
				fnSucc(oAjax.responseText);

			}else
			{
				// 失败
				if(fnFaild)
				{
					// 传入失败状态码，方便查找并处理
					fnFaild(oAjax.status);
				}
			}
		}
	};
};