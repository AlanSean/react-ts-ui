
import test from './test'; //测试

let routes = [];

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
                {
                    path: '/',
                    redirect: '/home',
                    exact: true,
                },
                ...routes
            ]
        }
    ]
}
