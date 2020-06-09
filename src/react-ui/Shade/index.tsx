import React from 'react';
import classnames from 'classnames';
import {  ShadeProps, ContentAnimation } from './interface';
import { CSSTransition } from 'react-transition-group';
import { scorllStop } from '../static/js/factory';

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
    right = getAnimationClassNames('right'),
    up = getAnimationClassNames('up'),
    bottom = getAnimationClassNames('bottom'),
    scales = getAnimationClassNames('scale');


class Shade extends React.Component<ShadeProps> {
    constructor(props: ShadeProps) {
        super(props);
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
    getclassNames = ():ContentAnimation => {
        const { animation } = this.props;
        if (animation == 'scale') {
            return scales
        }
        if (animation == 'left') {
            return left
        }
        if (animation == 'right') {
            return right
        }
        if (animation == 'bottom') {
            return bottom
        }
        return up
    }

    close = () => {
        this.props.hide && this.props.hide();
    }
    render() {
        let { children, isShow,animation,shadowClass } = this.props,
             animationName = animation && /left|scale|bottom|right/g.test(animation) ? animation : 'up';
        return (
            <div
                className={classnames('Shade-fixed-center', 'Shade-shade', !isShow ? 'Shade-hide' : 'Shade-show')}>
                <CSSTransition 
                    in={!isShow} 
                    timeout={300}
                    classNames={shadowstyles}>
                    <div className={classnames(
                        'Shade-fixed-center',
                        'Shade-shadow',
                        shadowClass || 'Shade-defaultShadow',
                    )} onClick={this.close} />
                </CSSTransition>
                <CSSTransition in={!isShow} timeout={200}
                    classNames={this.getclassNames()}>
                    <div className={classnames('Shade-content', 'Shade-'+animationName+'Content')}>
                        {children}
                    </div>
                </CSSTransition>
            </div>
        )
    }
}
export default Shade;