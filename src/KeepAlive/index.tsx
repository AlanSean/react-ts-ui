export { default as KeepAlive } from './KeepAlive';
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
export { useAliveController, withAliveScope, withActivation } from 'react-activation';
