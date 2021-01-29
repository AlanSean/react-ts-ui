import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import domRender from '../static/js/factory/domRender';
interface stateType {
    isShow: boolean
}
interface configType {
    duration: number
    shadowClass: string
}
interface ShadowType {
    config: (options: Partial<configType>) => void,
    show: () => void,
    hide: () => void
}
interface callback{
    (option: ShadowType) : void
}
interface getRef {
    (el: BoxShadow): void;
}
const time = 300,
    shadowclassname = 'Shade-defaultShadow';

const config: configType = {
    duration: time,
    shadowClass: shadowclassname
};

class BoxShadow extends React.Component<any, stateType>{
    static newInstance: (callback: callback) => void;
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false
        };
    }
    config = (options: Partial<configType>) => {
        const { duration = time, shadowClass = shadowclassname } = options;

        config.duration = duration;
        config.shadowClass = shadowClass;
    }
    show = () => {
        this.setState({
            isShow: true
        });
    }
    hide = () => {
        this.setState({
            isShow: false
        });
    }
    render() {
        const { isShow } = this.state;

        return (
            <CSSTransition
                in={isShow}
                timeout={config.duration}
                classNames='Shade-shadow'>
                <div {...this.props}
                    className={classnames(
                        'Shade-shadow',
                        config.shadowClass,
                    )} />
            </CSSTransition>
        );
    }
}

BoxShadow.newInstance = (function () {
    let boxShadow!: BoxShadow;
    const cbParmas: ShadowType = {
        config: function (options) {
            boxShadow.config(options);
        },
        show: function () {
            boxShadow.show();
        },
        hide: function () {
            boxShadow.hide();
        }
    };

    function init(ref: getRef) {
        return domRender(<BoxShadow ref={ref} />);
    }

    return function (cb: callback) {
        if (!boxShadow) {
            init(function (el) {
                boxShadow = el;
                cb(cbParmas);
            });
            return;
        }
        cb(cbParmas);
    };
})();


export {
    ShadowType
};
export default BoxShadow;

