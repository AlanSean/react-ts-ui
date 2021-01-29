/*
 * @Author: Alan
 * @LastEditors: Alan
 */
export default function singleton<T>(fn: Function) {
    var result: T;

    return function (this: T, ...args: any[]) {
        return result || (result = fn.apply(this, args));
    };
}
