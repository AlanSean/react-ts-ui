export interface ShadeState {
}
export interface ShadeProps {
    shadowClass?: string;
    animation?: string;
    isShow: boolean;
    hide?: () => void;
}
export interface ContentAnimation {
    enter: string;
    enterActive: string;
    exit: string;
    exitActive: string;
    exitDone: string;
}
