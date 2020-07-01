import { VideoJsPlayer } from 'video.js';

export interface  StateType {
    isShow: boolean,
    animation: string
}

export interface newVideoJsPlayer extends VideoJsPlayer {
    landscapeFullscreen?: any
}