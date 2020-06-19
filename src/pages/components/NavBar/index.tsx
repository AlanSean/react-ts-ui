import React from 'react';
import { NavBarProps } from './index.d';
import { NavBar as AntdNavBar } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';
import classnames from 'classnames';
function HistoryBack(){
    if (/first\=1/g.test(decodeURIComponent(window.location.href))){
        router.push('/home');
   } else {
        router.goBack();
   }
}
//返回
function Back(){
    return (
        <div key="iconshezhi" onClick={HistoryBack} className={styles.back}>
            <svg className={classnames("icon")} aria-hidden="true" >
                <use xlinkHref="#fanhui" />
            </svg>
        </div>
    )
}

function NavBar(props: NavBarProps){
    const { rightContent, backHide, children} = props;
    
    return  (
        <AntdNavBar mode="light"
            className={'fixed-center'}
            leftContent={[
                !backHide && Back()
            ]}
            rightContent={rightContent}
        >
            {children}
        </AntdNavBar>
    )
}
export default NavBar;
