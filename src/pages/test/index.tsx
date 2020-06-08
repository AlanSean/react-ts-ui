import React,{useState} from 'react';
import css from './index.less';
import { NavBar } from '@/pages/components/index';
import { Shade } from '@/react-ui/index';
export default () => {
    const [isShow,setIsShow] = useState<boolean>(false)
    return (
        <div className={css.test}>
            <NavBar backHide={true}>测试导航栏</NavBar>

            <button onClick={() => setIsShow(true)}>234242</button>
            <Shade 
                isShow={isShow} 
                animation="bottom"
                hide={() => setIsShow(false)}>
                <div style={{background:"#fff",height:"100px"}}>
                    wefwdfsddfsdf
                </div>
            </Shade>
        </div>
    )
}
