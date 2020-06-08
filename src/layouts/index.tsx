import React  from 'react';
// import { Toast } from 'antd-mobile'
import {  NavBar } from '@/pages/components/index';
import { withAliveScope, withActivation } from '@/react-ui/index';
// keep注销配置表
const KeepAliveDrop = {
    //key :当前路由 ,values 要卸载的缓存模块  name
    '/': [
        'Match',
        'expertHome',
        'my'
    ],
}
class Layouts extends React.Component<any,any>{
    constructor(props: any){
        super(props);
        const { drop, history  } = props;
        this.state = {
            onLine: true
        }
        history.listen((route:Route) => {
            const KeepAliveNameArray = KeepAliveDrop[route.pathname]
            if (KeepAliveNameArray) {
                KeepAliveNameArray.forEach( (name:string) => {
                    drop(name); 
                });
            }
        });
        window.ononline = () => {
            this.setState({
                onLine: true
            })
        }
    }
    render() {
        if (navigator.onLine && this.state.onLine){
            return this.props.children
        } else {
            return (
                <div className="offline">
                    <NavBar backHide={true}/>
                </div>
            )
        }
        
    }
}
export default withAliveScope(withActivation(Layouts));
