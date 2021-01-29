import React, { useState } from 'react';
import { Shade } from '@/react-ui/index';
import css from './index.less';

export default () => {
    const [isShow, setIsShow] = useState<boolean>(false),
        [animation, setAnimation] = useState<string>('up');
    
    return (
        <div className={css.shade_example}>
            <button type="button" onClick={() => {
                setIsShow(true);
                setAnimation('up');
            }}>up</button>
            <button type="button" onClick={() => {
                setIsShow(true);
                setAnimation('left');
            }}>left</button>
            <button type="button" onClick={() => {
                setIsShow(true);
                setAnimation('right');
            }}>right</button>
            <button type="button" onClick={() => {
                setIsShow(true);
                setAnimation('scale');
            }}>scale</button>
            <button type="button" onClick={() => {
                setIsShow(true);
                setAnimation('bottom');
            }}>bottom</button>
            <Shade
                isShow={isShow}
                animation={animation}
                hide={() => setIsShow(false)}>
                <div style={{ background: '#fff', height: '100%', minHeight: '400px', minWidth: '5rem' }}>
                    Shade
                </div>
            </Shade>
        </div>
    );
};
