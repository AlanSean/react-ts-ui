export default function singleton<T>(fn: Function): (this: any, ...args: any[]) => any;
