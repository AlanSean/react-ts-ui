import { CSSProperties } from "react";
export interface IndexProps {
    children: JSX.Element | JSX.Element[];
    reload?: (reload: Function) => void;
    pullOnLoad?: () => void;
    scrollDomId?: string;
    className?: string;
    style?: CSSProperties;
}
export interface IndexState {
    status: string;
    marginTop: string | number;
    loosen: boolean;
}
