import React from 'react';
import { IndexProps, IndexState } from './PropsType';
import classnames from 'classnames';
import { scrollTop } from '../static/js/compatibility/index';

class PullToRefresh extends React.Component<IndexProps, IndexState>{
    private pullToRefresh= React.createRef<any>();
    private startY!:number;
    private isTouchDown= true;
    private topDistance = 50;
    private flag= true;
    private text = {
        pull: '下拉刷新',//pull 时加载提示区域的文字
        loading: <div className="spinner"> <div className='snake'></div></div>,//loading 时加载提示区域的文字
        drop: '释放更新', //drop 时加载提示区域的文字
    };
    private time1?: number;
    private overtime?: number;//超时定时器
    private scrollDom!: "" |  HTMLElement | null | undefined;
    private ticking: number | null = null;
    constructor(props: IndexProps){
        super(props);
        this.state = {
            status: '',
            marginTop: 0,
            loosen: false
        }
    }
    componentDidMount() {
        const scrollDomId = this.props.scrollDomId;
        this.scrollDom = scrollDomId && document.querySelector<HTMLElement>(scrollDomId);
        if (!!this.scrollDom){
            this.scrollDom.addEventListener('scroll', this.handler);
        } else {
            window.addEventListener('scroll', this.handler);
        }
        if (this.props.reload) {
            this.pullToRefresh.current.addEventListener('touchstart', this.touchStart, { passive: false });
            this.pullToRefresh.current.addEventListener('touchmove', this.touchMove, { passive: false });
            this.pullToRefresh.current.addEventListener('touchend', this.touchEnd, { passive: false });
        }
        
    }
    componentWillUnmount() {
        if (!!this.scrollDom) {
            this.scrollDom.removeEventListener('scroll', this.handler);
        } else {
            window.removeEventListener('scroll', this.handler);
        }
        if (this.ticking !== null) {
            window.cancelAnimationFrame(this.ticking);
        }
        clearTimeout(this.time1);
        clearTimeout(this.overtime);
        if(this.props.reload){
            this.pullToRefresh.current.removeEventListener('touchstart', this.touchStart);
            this.pullToRefresh.current.removeEventListener('touchsmove', this.touchMove);
            this.pullToRefresh.current.removeEventListener('touchsend', this.touchEnd);
        }
        
    }
    handler = () => {
        if (this.ticking == null){
            this.ticking = window.requestAnimationFrame(() => {
                const scrollDomInfo = this.getScrollDomInfo();
                //是否可以下拉
                this.isTouchDown = !scrollDomInfo.scrollTop;
                if (this.props.pullOnLoad){
                    const { offsetHeight, scrollHeight, scrollTop } = scrollDomInfo;
                    if (Math.round(scrollTop + offsetHeight) == Math.round(scrollHeight)){
                        this.props.pullOnLoad();
                    }
                }
                if (this.ticking !== null) {
                    window.cancelAnimationFrame(this.ticking);
                    this.ticking = null;
                }
                
            });
        }
    }
    getScrollDomInfo = () => {
        const info={
            scrollTop: 0,
            offsetHeight:0,
            scrollHeight:0
        };
        info.scrollTop = !!this.scrollDom ? this.scrollDom.scrollTop : scrollTop()
        if (this.props.pullOnLoad){
            
            if (!!this.scrollDom){
                info.offsetHeight = this.scrollDom.offsetHeight;
                info.scrollHeight = this.scrollDom.scrollHeight;
            }    else {
                info.offsetHeight = window.innerHeight;
                info.scrollHeight = document.querySelector<HTMLElement>('#root>div')!.offsetHeight;
            }
        }
        return info;
    }
    touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0] || e.changedTouches[0];
        if (this.isTouchDown) {
            this.setState({
                status: '',
                loosen: false,
            })
            this.startY = touch.pageY;
        }
    }
    touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const {
                isTouchDown,
                startY,
                topDistance,
                state: { status }
            } = this,
            touch = e.touches[0] || e.changedTouches[0];
        
        if (!isTouchDown) return;
        
        var cha = (touch.pageY - startY) / 2

        if (cha >= 0) {
            e.preventDefault();
            this.setState({
                marginTop: cha
            })
        } else {
            if (status !=''){
                this.setState({
                    status: ''
                })
            }
        }

        if (cha >= topDistance && status != 'drop') {
            this.setState({
                status: 'drop'
            })
        }
        if (cha >0 && cha < topDistance && status != 'pull') {
            this.setState({
                status: 'pull'
            })
        }
    }
    touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        // 
        const {
            isTouchDown,
            startY,
            topDistance,
            flag,
        } = this,
        touch = e.touches[0] || e.changedTouches[0];
        if (!isTouchDown) return;
        var cha = (touch.pageY - startY) / 2;
        if (cha <= 0) return;
        if (cha >= topDistance && flag) {
            this.flag = false;
            this.setState({
                status: 'loading',
                marginTop: topDistance
            });
            this.time1 = setTimeout(() => {
                if (this.props.reload){
                    this.props.reload(() => {
                        this .onTopLoaded();
                    });
                    this.overtime = setTimeout( () => {
                        if (!this.flag && !this.isTouchDown){
                            console.log('超时了哦');
                            this.onTopLoaded();
                        }
                        clearTimeout(this.overtime);
                    },10000)
                } else {
                    this.onTopLoaded();
                }
                clearTimeout(this.time1);
            }, Math.random()*500+600);
            
        } else {
            this.setState({
                status: 'loosen',
                marginTop: cha > 0 ? cha : 0
            });
            this.onTopLoaded();
        }
        this.isTouchDown = false;
        this.setState({
            loosen: true
        });
    }
    
    onTopLoaded =  () =>{
        this.flag = true;
        this.isTouchDown = true;
        this.setState({
            marginTop:0,
            status: ''
        });
    }
    render(){
        const { status, marginTop, loosen } = this.state;
        return (
            <div 
                style={this.props.style} 
                className={this.props.className}
                ref={this.pullToRefresh}>
                <div className={'pullToRefresh'} 
 
                >
                    <div className={
                        classnames('pull-content', {'pull-transition': loosen })
                    }
                        // style={{ transform: marginTop > 0 ? `translateY(${marginTop}px)` : 'none'}}
                        style={{ top: marginTop > 0 ? `${marginTop}px` : '0' }}
                    >
                        <div className={'pull-indicator'}>
                            {this.text[status]}
                        </div>
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default PullToRefresh;