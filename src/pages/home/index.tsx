import React from 'react';
import router from 'umi/router'; 
import { routes } from '@/../config/route/index';

import css from './index.less';

export default () => {
    return (
        <ul className={css.home}>
            {
                routes.map(item => {
                    if (item.path !='/'){
                        return <li key={item.path} onClick={() => router.push(item.path)} >{item.meta?.title}</li>;
                    } else {
                        return null;
                    }
                })
            }
        </ul>
    );
};
