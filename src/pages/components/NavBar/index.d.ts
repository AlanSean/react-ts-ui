import * as React from 'react';
export interface NavBarProps extends React.HTMLProps<HTMLDivElement> {
    rightContent?: React.ReactNode;
    backHide?:boolean
}
