export interface  thatType{
    scrollTop?: number,
    toLoad: () => void,
    unbind: () => void,
}
export type scorllStopParams= (isHidden?:Boolean|undefined,isBg?:Boolean|undefined) =>  void;
