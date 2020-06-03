interface cb {
    (theNum: number, time: number): void
}

export interface VcurvePublic {
    starNum?: number,
    endNum?: number,
    start(cb: undefined): void;
    start(cb: cb): void;
    update(endNum: number, cb?:undefined): void;
    update(endNum: number, cb?:cb): void;
    pause(): void;
}
 


export interface Constructor {
    duration?: number,
    starNum?: number,
    endNum?: number,
    reductionGear?: boolean,//渐减速
    toFixed?: number,//保留小数
    startCb?: any,
}

//pause的返回值
export interface pauseReturn {
    theNum: number,
    progress: number,
    paused: boolean
}


//导出函数暴露的方法
export interface VcurveConstructor {
    new(options: Constructor): VcurvePublic
}