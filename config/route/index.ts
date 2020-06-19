
import test from './test'; //测试

export let routes = [
    {
        name: 'home',
        path: '/',
        component: 'home/index',
        meta: {
            title: '首页'
        }
    },
    {
        name: 'shade',
        path: '/shade',
        component: 'shade/index',
        meta:{
            title: '弹窗遮层'
        }
    },
    {
        name: 'tabs',
        path: '/tabs',
        component: 'tabs/index',
        meta: {
            title: 'Tabs'
        }
    }
];

const UMI_ENV = process.env.UMI_ENV;
if (UMI_ENV == 'local') {
    routes.push(...test);
}
export default {
    routes:[
        {
            path: '/',
            component: '../layouts/index',
            routes: [
                ...routes
            ]
        }
    ]
}
