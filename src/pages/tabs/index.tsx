import React from 'react';
import css from './index.less';
import { Tabs } from '@/react-ui/index';
import Tab1 from './tab1'
import Tab2 from './tab2'
import Tab3 from './tab3'
const tabs = [
    {
        title: "tab1",
    },
    {
        title: "tab2",
    },
    {
        title: "tab3",
    }
]
export default () => {
    return (
        <div className={css.shade_example}>
            <Tabs
                tabs={tabs}
                initialPage={0}
                pullToRefresh={true}
                pullOnLoad={true}
                fixedTop={45}
            >
                <Tab1 />
                <Tab2 />
                <Tab3 />
            </Tabs>
        </div>
    )
}
