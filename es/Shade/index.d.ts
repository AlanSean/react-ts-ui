import React from 'react';
import { ShadeProps, ContentAnimation } from './interface';
declare class Shade extends React.Component<ShadeProps> {
    constructor(props: ShadeProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: ShadeProps): void;
    getclassNames: () => ContentAnimation;
    close: () => void;
    render(): JSX.Element;
}
export default Shade;
