import React from 'react';
import { IndexProps, IndexState } from './PropsType';
declare class PullToRefresh extends React.Component<IndexProps, IndexState> {
    private pullToRefresh;
    private startY;
    private isTouchDown;
    private topDistance;
    private flag;
    private text;
    private time1?;
    private overtime?;
    private scrollDom;
    private ticking;
    constructor(props: IndexProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handler: () => void;
    getScrollDomInfo: () => {
        scrollTop: number;
        offsetHeight: number;
        scrollHeight: number;
    };
    touchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
    touchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
    touchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTopLoaded: () => void;
    render(): JSX.Element;
}
export default PullToRefresh;
