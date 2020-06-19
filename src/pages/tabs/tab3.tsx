import React, { useState, Ref, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react';
import css from './index.less';
import { delay } from '@/static/js/'
export default forwardRef((props: {}, ref: Ref<any>) => {
    const [list, setList] = useState(10);
    useImperativeHandle(ref, () => {
        return {
            async reload(cancel: Function){
                await delay(2);
                console.log('reload')
                setList(10);
                cancel && cancel();
            },
            pullOnLoad(){
                if(list<100){
                    setList(list+10);
                }
                console.log('pullOnLoad')
            }
        }
    });
    const List  = useCallback( () => {
        const ele = [];
        for(let i=0;i<list;i++){
            ele[ele.length] = <div className={css.li} key={i}>{i}</div>
        }
        return ele;
    },[list])
    return (
        <div className={css.shade_example}>
            {List()}
        </div>
    )
})


