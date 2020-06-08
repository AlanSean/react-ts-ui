declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
interface cb { (key?: number): void; }

// google analytics interface
interface GAFieldsObject {
    eventCategory: string;
    eventAction: string;
    eventLabel?: string;
    eventValue?: number;
    nonInteraction?: boolean;
}
interface scrollTtoptParams {
    top: number,
    behavior?: string
}
interface Window {
    g_app: any,
    ga: (
        command: 'send',
        hitType: 'event' | 'pageview',
        fieldsObject: GAFieldsObject | string,
    ) => void;
    reloadAuthorized: () => void;
    scrollTop: () => number;
    scrollLeft: () => number;
    scrollTotop: (scroll: number | scrollTtoptParams) => void;
    ppsport:{
        [key:string]:any
    }
    indicator:{
        open:Function
        close:Function
    }
}
//请求泛型  T 参数类型 reslove返回值的类型
interface requset<T> {
    (
        arg: T,
        flag?: boolean,
        cb?: Function
    ): Promise<any>;
}
declare let ga: Function;

interface Location {
    query: { [key: string]: string };
    pathname: string;
    search: string;
    state: any;
    hash: string;
    key?: string;
}


interface Route extends MenuDataItem {
    routes?: Route[];
    authority?: string[] | string;
    children?: MenuDataItem[];
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    icon?: React.ReactNode;
    locale?: string | false;
    name?: string;
    key?: string;
    path?: string;
    [key: string]: any;
    parentKeys?: string[];
}
