import React from 'react';
import { Props,Router }  from './PropsType';
import { NavBar } from '@/pages/components/index';
import { withAliveScope, withActivation } from '@/react-ui/index';
import { getMetaFromRouter } from '@/static/js/utils';

// keep注销配置表
const KeepAliveDrop = {
    //key :当前路由 ,values 要卸载的缓存模块  name
    '/': [
        'Match',
        'expertHome',
        'my'
    ],
}

//这里飘红的原因是无法匹配到 react-activation 所写的类型 故使用  ts-ignore忽略
// @ts-ignore
@withAliveScope
// @ts-ignore
@withActivation
class Layouts extends React.Component<Props,any>{
    constructor(props: Props) {
        super(props);
        const { drop, history } = props;
        history.listen(route => {
            const KeepAliveNameArray:string[] = KeepAliveDrop[route.pathname]
            if (KeepAliveNameArray) {
                KeepAliveNameArray.forEach(name => {
                    drop(name);
                });
            }
        });
    }
    render() {
        const { location, route: { routes } } = this.props;
        const router = getMetaFromRouter<Router>(routes, location.pathname);
        return (
            <div>
                <NavBar backHide={router && router.path =='/'}>{router && router.meta && router.meta.title}</NavBar>
                {this.props.children}
            </div>
        )

    }
}
export default Layouts;
