import React from 'react';
import classnames from 'classnames';
import {LoadingProps, LoadingState} from './interface';
class Loading extends React.Component<LoadingProps, LoadingState> {
    
    constructor(props: LoadingProps){
        super(props);
        this.state = {
            hidden: false
        }
    }

    render(){
        let {flag} = this.props,
            {hidden} = this.state;
        flag = flag==undefined? true : this.props.flag;
        return (
            <div className={classnames(
                { 'hide': !flag || hidden },
                'indicator')}>
                <div className={"indicator-mask"}></div>
                <div className={"indicator-wrapper"}>
                    <span className={"indicator-spin"}>
                        <div className={"indicator-spinner-snake"}></div>
                    </span>
                    <span className={"indicator-text"}>加载中</span>
                </div>
            </div>
        )
    }
}

export default Loading;