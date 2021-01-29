/*
 * @Author: Alan
 * @LastEditors: Alan
 */

import test from './test'; //测试
import desinMode from './DesignMode';//设计模式

export const routes = [
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
        meta: {
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
    },
    {
        name: 'VideoM3u8',
        path: '/VideoM3u8',
        component: 'Video-m3u8/index',
        meta: {
            title: 'VideoM3u8'
        }
    },
    desinMode
];

const { UMI_ENV } = process.env;

if (UMI_ENV == 'local') {
    routes.push(...test);
}
const route = {
    routes: [
        {
            path: '/',
            component: '../layouts/index',
            routes: [
                ...routes
            ]
        }
    ]
};

export default route;
