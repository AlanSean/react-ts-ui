export interface ShadeState {
    // transitionTn: boolean
}
export interface ShadeProps {
    // maskClosable?: boolean //点击遮罩是否关闭
    shadowClass?: string
    animation?: string
    isShow: boolean // true显示 false隐藏
    hide?: () => void;
}
export interface ContentAnimation {
    enter: string
    enterActive: string
    exit: string
    exitActive: string
    exitDone: string
}