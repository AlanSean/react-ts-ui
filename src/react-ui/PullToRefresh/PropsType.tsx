import { CSSProperties } from "react";

export interface IndexProps{
    children: JSX.Element | JSX.Element[] //子组件
    reload?: (reload: Function) => void
    pullOnLoad?: () => void
    scrollDomId?:string//BOM元素 scroll容器id 默认监听window
    className?: string
    style?: CSSProperties
}
export interface IndexState {
    status: string
    marginTop: string |number
    loosen: boolean
}