import React from 'react';
import classnames from 'classnames';
import { TablistProps, TablistState, TabData } from './PropsType';
import PullToRefresh from '../PullToRefresh/index';
import { scrollTop } from '../static/js/compatibility/index'
class Tablist extends React.Component<TablistProps, TablistState>{
    private ticking: number | null = null;
    private tabsRefs = React.createRef<any>();
    private activeClass!: string;
    private defaultClass!: string;
    private tabWidth: number;//百分比
    private defaultBarClass!: string;
    private barWidth!: number;//百分比
    private isAnimate!: boolean;
    private isBarUnderline!: boolean;
    private tablistWidth!: number;//百分比
    private pullToRefresh!: boolean;//是否下拉刷新
    private pullOnLoad!: boolean;//是否触底加载
    private childRefs: { [key: number]: React.RefObject<any> } = {};
    constructor(props: TablistProps) {
        super(props);

        const {
            activeClass,
            defaultClass,
            defaultBarClass,
            barWidth,
            isAnimate,
            isBarUnderline,
            tablistWidth,
            tabs,
            pullToRefresh,
            pullOnLoad,
        } = props,
            clientWidth = document.documentElement.clientWidth;
        //选中class
        this.activeClass = activeClass || 'tabs-default-bar-bth-active';
        this.defaultClass = defaultClass || '';
        this.defaultBarClass = defaultBarClass || 'tabs-default-bar-underline';
        //切换动画
        this.isAnimate = isAnimate != undefined ? isAnimate : true;
        //选中的下划线 
        this.isBarUnderline = isBarUnderline != undefined ? isBarUnderline : true;
        this.tablistWidth = tablistWidth != undefined ? parseFloat(tablistWidth) / clientWidth : 1;
        this.tabWidth = barWidth ? this.tablistWidth / tabs.length : 1 / tabs.length;
        this.barWidth = barWidth && barWidth / (this.tablistWidth * clientWidth) || this.tabWidth;
        this.pullToRefresh = !!pullToRefresh;
        this.pullOnLoad = !!pullOnLoad;

        this.state = {
            activeIndex: Number(props.initialPage) || 0,
            isInit: props.tabs.map((_item, index) => {
                if (this.pullToRefresh || this.pullOnLoad) this.childRefs[index] = React.createRef();
                return index == Number(props.initialPage)
            }),
            isFixed: false,//是否吸顶
        }
    }
    componentDidMount() {
        if (typeof this.props.fixedTop == 'number') {
            window.addEventListener('scroll', this.scrollChange)
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollChange)
        if (this.ticking !== null) {
            window.cancelAnimationFrame(this.ticking);
            this.ticking = null;
        }
    }
    componentDidUpdate(oldProps: TablistProps) {
        const { initialPage, tabs } = this.props,
            oldInitialPage = oldProps.initialPage;

        if (initialPage != undefined && oldInitialPage != initialPage) {
            this.onClick(tabs[initialPage], Number(initialPage));
        }
    }
    scrollChange = () => {
        if (this.ticking == null) {
            this.ticking = window.requestAnimationFrame(() => {
                if (typeof this.props.fixedTop != 'number') {
                    this.cancelAnimationFrame();
                    return
                }
                const offsetTop = this.tabsRefs.current.offsetTop,
                    fixedTop = this.props.fixedTop;
                const isFixed = scrollTop() >= offsetTop - fixedTop;
                if (this.state.isFixed != isFixed) {
                    this.setState({
                        isFixed: isFixed
                    });
                    this.props.onFixed && this.props.onFixed(isFixed);
                }
                this.cancelAnimationFrame();
            });
        }

    }
    cancelAnimationFrame() {
        if (this.ticking !== null) {
            window.cancelAnimationFrame(this.ticking);
            this.ticking = null;
        }
    }
    onChange = (tab: TabData, index: number) => {
        this.props.onChange && this.props.onChange(tab, index);
    }
    onClick = (tab: TabData, index: number) => {
        const isInit = this.state.isInit;
        isInit[index] = true;
        this.setState({
            activeIndex: index,
            isInit: isInit
        })
        this.onChange(tab, index);
        this.props.onClick && this.props.onClick(tab, index);
    }
    childredInit = (index: number) => {
        const { children } = this.props,
            { activeIndex, isInit } = this.state;

        if (isInit[index] || activeIndex == index) {
            const newChild = children && children.hasOwnProperty('length') ? children[index] : children;
            if (this.pullToRefresh || this.pullOnLoad) {
                return React.cloneElement(newChild, { ref: this.childRefs[index] })
            } else {
                return newChild;
            }

        } else {
            return null;
        }
    }

    underline = () => {
        if (!this.isBarUnderline) return null;
        const { activeIndex } = this.state,
            barLeft = (this.tabWidth - this.barWidth) - ((this.tabWidth - this.barWidth) / 2);
        return (
            <div
                className={classnames('tabs-bar-underline', this.defaultBarClass)}
                style={{
                    width: this.barWidth * 100 + '%',
                    left: this.tabWidth ? (activeIndex * this.tabWidth * 100) + barLeft * 100 + '%' : 0
                }}
            >
            </div>
        )
    }
    //组件下拉刷新重载
    reload = (reload: Function) => {
        const { activeIndex } = this.state,
            current = this.childRefs[activeIndex].current;
        current && current.reload ? current.reload(reload) : reload && reload();
    }
    //组件上拉加载
    pullLoad = () => {
        const { activeIndex } = this.state,
            current = this.childRefs[activeIndex].current;
        current && current.pullOnLoad && current.pullOnLoad();
    }
    contentWarpElmen = () => {
        const { tabs } = this.props,
            { activeIndex } = this.state;
        return (
            <div
                className={classnames("tabs-content-warp", {
                    'tabs-content-warp-animate': this.isAnimate
                })}
                style={{
                    left: -1 * activeIndex * 100 + '%'
                }}
            >
                {
                    tabs.map((_item, index) => {
                        return (
                            <div
                                key={index}
                                className={classnames(
                                    "tabs-content-pane-warp",
                                    activeIndex == index ? "tabs-content-active" : 'abscontent-inactive'
                                )}>
                                {this.childredInit(index)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    PullToRefreshElement = () => {
        return (
            <PullToRefresh
                reload={this.pullToRefresh ? this.reload : undefined}
                pullOnLoad={this.props.pullOnLoad ? this.pullLoad : undefined}>
                {this.contentWarpElmen()}
            </PullToRefresh>
        )
    }
    render() {
        const { tabs, fixedTop, pullOnLoad } = this.props,
            { activeIndex, isFixed } = this.state;
        return (
            <div
                className={classnames('tabs-container', { 'tabs-fixed': isFixed })}
                style={{ paddingTop: isFixed ? fixedTop + 'px' : '' }}
                ref={this.tabsRefs}>
                <div
                    className={'tabs-tablist'}
                    style={{
                        top: isFixed ? fixedTop + 'px' : '',
                        width: this.tablistWidth * 100 + '%'
                    }}>
                    <div className={classnames("tabs-defult-bar", this.defaultClass)}>
                        {
                            tabs.map((item, index) => {
                                return (
                                    <div
                                        id={'tabs_' + index}
                                        key={index}
                                        onClick={this.onClick.bind(this, item, index)}
                                        className={classnames(
                                            "tabs-default-bar-bth",
                                            {
                                                [this.activeClass]: activeIndex == index
                                            })}
                                        style={{ width: (100 / tabs.length) + '%' }}
                                    >
                                        {item.title}
                                    </div>
                                )
                            })
                        }
                        {this.underline()}
                    </div>
                </div>
                {
                    this.pullToRefresh || !!pullOnLoad ? this.PullToRefreshElement() : this.contentWarpElmen()
                }
            </div>
        )
    }
}

export default Tablist;