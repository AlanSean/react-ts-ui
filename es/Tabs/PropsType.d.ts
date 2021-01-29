/// <reference types="react" />
export interface TabData {
    key?: string;
    title: React.ReactNode;
    [key: string]: any;
    onUpdate?: () => void;
}
export interface TablistProps {
    tabs: TabData[];
    initialPage?: string | number | undefined;
    onChange?: (tab: TabData, index: number) => void;
    onClick?: (tab: TabData, index: number) => void;
    onFixed?: (isFixed: boolean) => void;
    fixedTop?: number;
    isAnimate?: boolean;
    activeClass?: string;
    defaultBarClass?: string;
    tablistWidth?: string;
    defaultClass?: string;
    isBarUnderline?: boolean;
    barWidth?: number;
    pullToRefresh?: boolean;
    pullOnLoad?: boolean;
}
export interface TablistState {
    activeIndex: number;
    isInit: boolean[];
    isFixed: boolean;
}
