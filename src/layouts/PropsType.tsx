import { RouteComponentProps } from "react-router";
import { ReactElement } from "react";
export interface Router{
    meta?:{
        title?:string
    },
    path:string,
    name:string
}
export interface Props extends RouteComponentProps{
    drop:(name:string) => void;
    children: ReactElement,
    route:{
        routes: Router[]
    }
}

