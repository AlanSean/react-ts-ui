import React from 'react';
import { NavBar } from '@/pages/components/index';
import { withAliveScope, withActivation } from '@/react-ui/index';
import { getMetaFromRouter } from '@/static/js/utils';
import { Props, Router } from './PropsType';

// keep注销配置表
const KeepAliveDrop = {
    //key :当前路由 ,values 要卸载的缓存模块  name
    '/': [
        'Match',
        'expertHome',
        'my'
    ]
};

//这里飘红的原因是无法匹配到 react-activation 所写的类型 故使用  ts-ignore忽略
// @ts-ignore
@withAliveScope
// @ts-ignore
@withActivation
class Layouts extends React.Component<Props, any>{
    constructor(props: Props) {
        super(props);
        const { drop, history } = props;

        history.listen(route => {
            const KeepAliveNameArray: string[] = KeepAliveDrop[route.pathname];

            if (KeepAliveNameArray) {
                KeepAliveNameArray.forEach(name => {
                    drop(name);
                });
            }
        });
    }
    render() {
        const { location, route: { routes } } = this.props,
            router = getMetaFromRouter<Router>(routes, location.pathname),
            title = router && router.meta && router.meta.title;

        title && (document.title = title);

        return (
            <div>
                <NavBar backHide={router && router.path == '/'}>{title}</NavBar>
                {this.props.children}
            </div>
        );

    }
}
export default Layouts;
