import React from 'react';
import css from './index.less';
import {routes} from '@/../config/route/index';
import router from 'umi/router';

export default () => {
    return (
        <ul className={css.home}>
            {
                routes.map(item => {
                    if(item.path !='/'){
                        return <li key={item.path} onClick={() => router.push(item.path)} >{item.meta?.title}</li>
                    } else {
                        return null
                    }
                })
            }
        </ul>
    )
}
