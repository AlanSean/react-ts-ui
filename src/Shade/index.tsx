import React from 'react';
import {  ShadeProps, ContentAnimation } from './interface';
import classnames from 'classnames'

function getAnimationClassNames(module:string){
    return {
        "enter": 'Shade-'+module+"__enter",
        "enterActive": 'Shade-'+module+"__enterActive",
        "exit": 'Shade-'+module+"__exit",
        "exitActive": 'Shade-'+module+"__exitActive",
        "exitDone": 'Shade-'+module+"__exitDone",
    }
}
const shadowstyles = getAnimationClassNames('shadow'),
    left = getAnimationClassNames('left'),
    up = getAnimationClassNames('up'),
    scales = getAnimationClassNames('scales');

import { CSSTransition } from 'react-transition-group';
import { scorllStop } from '../static/js/factory';
class Shade extends React.Component<ShadeProps> {
    private shadowClass: string;
    private ContentAnimation!: ContentAnimation;
    private animationName!: string;
    constructor(props: ShadeProps) {
        super(props);
        //外层class样式
        this.shadowClass = props.shadowClass || 'Shade-defaultShadow';
        this.ContentAnimation = this.getclassNames();
        //点击遮罩是否关闭
        // this.maskClosable = props.maskClosable != undefined ? props.maskClosable : true;
        //up 从下往上淡入 scale从小到大 居中淡入  left 屏幕右侧到左侧淡入
        this.animationName = props.animation || 'up'; 
    }
    componentDidMount() {
        scorllStop();
    }
    componentWillUnmount() {
        scorllStop();
    }
    componentWillReceiveProps(nextProps: ShadeProps){
        if (nextProps.isShow != this.props.isShow){
            scorllStop(nextProps.isShow);
        }
    }
    getclassNames = () => {
        const { animation } = this.props;
        if (animation == 'scale') {
            return scales
        }
        if (animation == 'left') {
            return left
        }
        return up
    }

    close = () => {
        this.props.hide && this.props.hide();
    }
    render() {
        let { children, isShow } = this.props;
        
        return (
            <div
                className={classnames('Shade-fixed-center', 'Shade-shade', !isShow ? 'sShade-show' : 'Shade-hide')}>
                <CSSTransition 
                    in={!isShow} 
                    timeout={300}
                    classNames={shadowstyles}>
                    <div className={classnames('Shade-fixed-center', 'Shade-shadow', this.shadowClass)} onClick={this.close} />
                </CSSTransition>
                {
                    <CSSTransition in={!this.props.isShow} timeout={200}
                        classNames={this.ContentAnimation}>
                        <div className={classnames('Shade-content', 'Shade-'+this.animationName+'Content')}>
                            {children}
                        </div>
                    </CSSTransition>
                }
            </div>
        )
    }
}
export default Shade;