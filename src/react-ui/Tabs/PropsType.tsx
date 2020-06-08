
export interface TabData {
    key?: string;
    title: React.ReactNode;
    [key: string]: any;
    onUpdate?:()=> void;
}
export interface TablistProps{
    tabs: TabData[];
    initialPage?: string | number | undefined;//初始选中 第几个tab  0-n
    onChange?: (tab: TabData, index: number) => void; //tab切换时触发
    onClick?: (tab: TabData, index: number) => void; //点击回调
    onFixed?: (isFixed: boolean) => void;// 开启吸顶后 吸顶状态变化触发回调 
    fixedTop?: boolean | number;//开启吸顶并设置 top的值
    isAnimate?:boolean;//容器是否开启动画
    activeClass?:string;//tab选中的样式
    defaultBarClass?:string;//修改tab 条的样式
    tablistWidth?:string;//tablist的宽度 单位 px
    defaultClass?:string;//tab默认样式
    isBarUnderline?: boolean;//是否需要tab下的bar 默认true
    barWidth?:number//bar的宽度 单位px
    pullToRefresh?:boolean //是否开启下拉刷新  开启下拉刷新 子组件内部需要有reload函数 并且接收reload回调函数
    pullOnLoad?: boolean//是否开启上拉加载
}
export interface TablistState{
    activeIndex: number ;
    isInit: boolean[];
    isFixed: boolean;
}