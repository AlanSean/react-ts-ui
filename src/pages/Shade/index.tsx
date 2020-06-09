import React,{useState} from 'react';
import css from './index.less';
import { Shade } from '@/react-ui/index';
export default () => {
    const [isShow,setIsShow] = useState<boolean>(false),
            [animation,setAnimation] = useState<string>('up');
    return (
        <div className={css.shade_example}>
            <button onClick={() => {
                setIsShow(true);
                setAnimation('up')
            }}>up</button>
            <button onClick={() => {
                setIsShow(true);
                setAnimation('left')
            }}>left</button>
            <button onClick={() => {
                setIsShow(true);
                setAnimation('right')
            }}>right</button>
            <button onClick={() => {
                setIsShow(true);
                setAnimation('scale')
            }}>scale</button>
            <button onClick={() => {
                setIsShow(true);
                setAnimation('bottom')
            }}>bottom</button>
            <Shade 
                isShow={isShow} 
                animation={animation}
                hide={() => setIsShow(false)}>
                <div style={{background:"#fff",height:"100%",minHeight:'400px',minWidth:'5rem'}}>
                    Shade
                </div>
            </Shade>
        </div>
    )
}
