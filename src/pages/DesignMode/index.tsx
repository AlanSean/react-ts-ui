import React from 'react';
import classnames from 'classnames';
import { PropsType, StateType } from './index.d';
import styles from './index.less';

class DesignMode extends React.Component<PropsType, StateType>{
    constructor(props: PropsType) {
        super(props);
    }
    componentDidMount() {
        var a = 1;

        console.log(a);
    }
    componentWillUnmount(){

    }
    render() {
        return (
            <div className={classnames(styles.a)}>

            </div>
        );
    }
}
export default DesignMode;