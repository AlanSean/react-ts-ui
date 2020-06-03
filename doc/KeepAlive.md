## KeepAlive

### [基于的插件](https://github.com/CJY0208/react-activation)

###  [文档地址](https://github.com/CJY0208/react-activation/blob/master/README_CN.md)

###  主要解决无法记录window滚动条问题，组件只会查找children属性中是否存在可滚动的元素

### 简单使用

```
KeepAlive({
    component: <组件名>,
    name: <唯一名称,有耦合的会出现问题>
})
//使用修饰器  原作者的ts的配置有点问题
// hooks的方式具体看文档
export default KeepAlive({
    component: withAliveScope(withActivation(home)),
    name: 'Home'
}); 
```
### 大概配置 其他看文档

1. babel 配置文件 .babelrc 中增加 react-activation/babel 插件
```
{
  "plugins": [
    "react-activation/babel"
  ]
}
```
2. 业务代码中，在不会被销毁的位置放置 `<AliveScope>` 外层，一般为应用入口处

注意：与 react-router 或 react-redux 配合使用时，需要将 `<AliveScope>` 放置在` <Router>` 或 `<Provider>` 内部
```
// entry.js

import React from 'react'
import ReactDOM from 'react-dom'
import { AliveScope } from 'react-activation'

import Test from './Test'

ReactDOM.render(
  <AliveScope>
    <Test />
  </AliveScope>,
  document.getElementById('root')
)

```
### 一些说明
```
//依赖
//const { drop, dropScope, clear, getCachingNodes } = useAliveController()
//drop(name):
// 按 name 卸载缓存状态下的 < KeepAlive > 节点，name 可选类型为 String 或 RegExp，注意，仅卸载命中 < KeepAlive > 的第一层内容，不会卸载 < KeepAlive > 中嵌套的、未命中的 < KeepAlive >
// dropScope(name)
// 按 name 卸载缓存状态下的 < KeepAlive > 节点，name 可选类型为 String 或 RegExp，将卸载命中 < KeepAlive > 的所有内容，包括 < KeepAlive > 中嵌套的所有 < KeepAlive >
// clear()
// 将清空所有缓存中的 KeepAlive
// getCachingNodes()
// 获取所有缓存中的节点
//class withAliveScope
//hooks useAliveController
// withActivation
// ClassComponent 可配合 withActivation 装饰器
// 使用 componentDidActivate 与 componentWillUnactivate 对应激活与缓存两种状态
// FunctionComponent 则分别使用 useActivate 与 useUnactivate hooks 钩子
```
