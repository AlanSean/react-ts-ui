import { KeepAlive as ReactKeepAlive, useActivate, useUnactivate } from 'react-activation';
// export * from 'react-activation'
import React, { useState, useRef, useEffect, useCallback}from 'react';
import { scrollTotop } from '../static/js/compatibility/index';
interface Deps{
    name: string
    [key:string]:any
}
interface props{
    deps: Deps
}
function isEqualAndTruthy(
    newKey?: string,
    lastKey?: string
) {
    if (!newKey || !lastKey) {
        return false;
    }
    if (newKey.length !== lastKey.length) {
        return false;
    }
    return true;
}

function Keep(props: props){
    const { deps } = props;
    const[scrollY, setScrollY] = useState<number | null > (null);
    let ticking: number | null = null;
   
    useActivate(() => {
        if (scrollY !== null) {
            const y = isEqualAndTruthy(savedDeps.current, deps.name) ? scrollY : 0;
            scrollTotop(y);
        }
        window.addEventListener('scroll', handler);
    });

    const savedDeps = useRef(deps.name);
    const savedCallback = useRef(() => { });
    const handler = useCallback( () => {
        if (ticking === null) {
            ticking = window.requestAnimationFrame(() => {
                // console.log(window.scrollY)
                setScrollY(window.scrollY);
                if (ticking !== null) {
                    window.cancelAnimationFrame(ticking);
                    ticking = null;
                }
            });
        }
    },[]);
    useEffect(() => {
        savedCallback.current = () => (savedDeps.current = deps.name);
        window.addEventListener('scroll', handler);
        return () => {
            window.removeEventListener('scroll', handler);
            if (ticking !== null) {
                window.cancelAnimationFrame(ticking);
            }
            savedCallback.current();
        }
    });

    useUnactivate(() => {
        window.removeEventListener('scroll', handler);
        if (ticking !== null) {
            window.cancelAnimationFrame(ticking);
        }
        savedCallback.current();
    });
    const Children = deps.component;
    return <Children {...props}/>
}
function KeepAlive(deps: Readonly<Deps>) {
    if (!deps.name) throw Error('name必传');
    if (!deps.component) throw Error('component必传');
    return (props:React.Props<any>) => <ReactKeepAlive name={deps.name}><Keep {...props} deps={deps} /></ReactKeepAlive >
}

export default KeepAlive;

