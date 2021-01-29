import React from 'react';
interface Deps {
    name: string;
    [key: string]: any;
}
declare function KeepAlive(deps: Readonly<Deps>): (props: React.Props<any>) => JSX.Element;
export default KeepAlive;
