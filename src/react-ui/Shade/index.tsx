import React from 'react';
import { CSSTransition } from 'react-transition-group';
import BoxShadow from '@/react-ui/BoxShadow';
import { ShadeProps, ContentAnimation } from './interface';
import { scorllStop } from '../static/js/factory';

function getAnimationClassNames(module: string) {
    return {
        'enter': `Shade-${module}__enter`,
        'enterActive': `Shade-${module}__enterActive`,
        'exit': `Shade-${module}__exit`,
        'exitActive': `Shade-${module}__exitActive`,
        'exitDone': `Shade-${module}__exitDone`
    };
}

const left = getAnimationClassNames('left'),
    right = getAnimationClassNames('right'),
    up = getAnimationClassNames('up'),
    bottom = getAnimationClassNames('bottom'),
    scales = getAnimationClassNames('scale');


class Shade extends React.Component<ShadeProps> {
    constructor(props: ShadeProps) {
        super(props);

        props.shadowClass && BoxShadow.config({
            shadowClass: props.shadowClass
        });

    }
    componentDidMount() {
        scorllStop();
    }
    componentWillUnmount() {
        scorllStop();
    }
    componentWillReceiveProps(nextProps: ShadeProps) {
        if (nextProps.isShow != this.props.isShow) {
            scorllStop(nextProps.isShow);
            if (nextProps.isShow) {
                BoxShadow.show();
            } else {
                BoxShadow.hide();
                this.props.hide && this.props.hide();
            }
        }
    }

    getclassNames = (): ContentAnimation => {
        const { animation } = this.props;

        if (animation == 'scale') {
            return scales;
        }
        if (animation == 'left') {
            return left;
        }
        if (animation == 'right') {
            return right;
        }
        if (animation == 'bottom') {
            return bottom;
        }
        return up;
    }

    close = () => {
        this.props.hide && this.props.hide();
    }

    render() {
        let { children, isShow, animation } = this.props,
            animationName = animation && /left|scale|bottom|right/g.test(animation) ? animation : 'up';

        return (
            <div
                className={`
                    Shade-fixed-center
                    Shade-shade 
                    ${!isShow ? 'Shade-hide' : 'Shade-show'}
                `}
                onClick={this.close}>
                <CSSTransition in={!isShow} timeout={200}
                    classNames={this.getclassNames()}>
                    <div
                        className={`Shade-content Shade-${animationName}Content`}
                        onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                </CSSTransition>
            </div>
        );
    }
}
export default Shade;