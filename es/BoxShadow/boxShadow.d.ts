import React from 'react';
interface stateType {
    isShow: boolean;
}
interface configType {
    duration: number;
    shadowClass: string;
}
declare class BoxShadow extends React.Component<any, stateType> {
    constructor(props: any);
    config: (options: Partial<configType>) => void;
    show: () => void;
    hide: () => void;
    render(): JSX.Element;
}
export default BoxShadow;
export { configType };
