/*
 * @Author: Alan
 * @LastEditors: Alan
 */
import { scorllStopParams } from './interface';
import { scrollTotop, scrollTop } from '../compatibility/index';

/**
 * @param { Boolean }   isHidden判断是否要禁止滚动或者一屏显示
 */
var scrollTopY: number | null;

export const scorllStop: scorllStopParams = function (isHidden) {
    if (isHidden) {
        scrollTopY = scrollTop();
        document.body.style.top = `-${scrollTopY}px`;
        document.body.style.left = '0px';
        document.body.style.right = '0px';
        document.body.style.position = 'fixed';
    } else {
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.position = '';
        scrollTopY !== null && scrollTotop(scrollTopY);
        scrollTopY = null;
    }
};

export { default as singleton } from './singleton';