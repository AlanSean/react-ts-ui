import {  scorllStopParams } from './interface'

import {scrollTotop,scrollTop }  from '../compatibility/index';

/**
 * @param { Boolean }   isHidden判断是否要禁止滚动或者一屏显示
 * @param { Boolean }   isBg判断是否要修改背景为白色
 */
var scrollTopY: number | undefined;
export const scorllStop: scorllStopParams = function (isHidden) {
    if (isHidden) {
        scrollTopY = scrollTop();
        document.body.style.top= "-" + scrollTopY + "px";
        document.body.style.position= 'fixed';
    } else {
        document.body.style.top= '';
        document.body.style.position= '';
        scrollTopY!==undefined && scrollTotop(scrollTopY);
        scrollTopY= undefined;
    }
};



