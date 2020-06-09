import { RouteComponentProps } from "react-router";
export interface Router{
    meta?:{
        title?:string
    },
    path:string,
    name:string
}
export interface Props extends RouteComponentProps{
    drop:(name:string) => void;
    route:{
        routes: Router[]
    }
}

