# PullToRefresh

```
 //子组件
children: JSX.Element | JSX.Element[]

//传入回调函数开启下拉刷新
reload?: (reload: Function) => void;
例子
    function reload(finally:Function){
        //...逻辑

        //调用回调函数 通知刷新完毕
        finally && finally();
    }
    <PullToRefresh 
        reload={reload}
    >
        <Compoent />
    </PullToRefresh>

//传入回调函数 开启触底加载
pullOnLoad?: () => void

例子
    function pullOnLoad(){
        //...触底后的逻辑
    }
    <PullToRefresh 
        pullOnLoad={pullOnLoad}
    >
        <Compoent />
    </PullToRefresh>


//BOM元素 scroll容器id 默认监听window
//监听window时 会以 #root>div 元素的offsetHeight来做计算,如果定死了可能出现意想不到的bug
scrollDomId?:string

className?: string

style?: CSSProperties


```