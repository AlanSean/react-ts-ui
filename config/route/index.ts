
import test from './test'; //测试

let routes = [
    {
        name: 'shade',
        path: '/shade',
        component: 'Shade/index',
        meta:{
            title: '弹窗遮层'
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
