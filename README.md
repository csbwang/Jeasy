# Jeasy：一个简单的Js框架
Jeasy提供以下功能：
-  节点对象获取
 - 通过id获取节点对象
`$().getId(id)`
 - 通过name获取节点对象
 `$().getName(name)`
 - 通过tag获取节点对象
 `$().getTag(tag)`
 - 通过class获取节点对象
 `$().getClass(className, id)`
 - 从节点数组中获取一个节点对象
 `$().getElement(index)`
- 添加、修改、查询css样式
`$().css(attr, value)`
- 添加事件处理程序
`$().addHander(type, hander)`
- 移除事件处理程序
`$().rmHander(type, hander)`
- 设置、获取 innerHTML
`$().html(str)`
- 添加class
`$().addClass(className)`
- 移除class
`$().rmClass(className)`
- 添加样式规则
`$().addRule(num, selectorStr, cssStr, position)`
- 移除样式规则
`$().rmRule(num, index)`