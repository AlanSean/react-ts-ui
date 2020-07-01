import React from 'react';
import css from './index.less';
import videojs from 'video.js';
import { getAgent } from '@/static/js';
import { Shade } from '@/react-ui/index';
import { StateType, newVideoJsPlayer} from './Types';
import './css.ts'
// import 'videojs-contrib-hls';
import 'videojs-landscape-fullscreen';

class VideoM3u8 extends React.Component<any,StateType>{
    private myPlayer!: newVideoJsPlayer;
    private myVideo = React.createRef<HTMLVideoElement>();
    constructor(_props: any){
        super(_props);
            this.state = {
                isShow:false,
                animation:'up'
            }
    }
    componentDidMount(){
        const myVideo = this.myVideo.current;
        if (!myVideo) return
        if (getAgent.ios) {
           myVideo.setAttribute("webkit-playsinline", "true");
           myVideo.setAttribute("playsinline", "true");
        }
        myVideo.setAttribute("x5-video-player-type", "h5-page");
        this.myPlayer = videojs(this.myVideo.current, {
            controls: true,
            sources: [{
                src: "http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8",
                type: 'application/x-mpegURL'
            }]
        }, ()=>{
            // this.myPlayer.play();
            this.myPlayer.on("pause", () => {
                this.myPlayer.one("play", () => {
                    this.myPlayer.src({ 
                        "type": this.myPlayer.currentType(),
                        "src": this.myPlayer.currentSrc() 
                    });
                    this.myPlayer.play();
                });
            });
        })
        if (this.myPlayer.landscapeFullscreen){
            this.myPlayer.landscapeFullscreen({
                fullscreen: {
                    enterOnRotate: true,
                    alwaysInLandscapeMode: true,
                    iOS: true
                }
            })
        }
    }

    render(){
        const { isShow, animation } = this.state;
        return (
            <div>
                <div className={css.myAudio}>
                    <video ref={this.myVideo} id="myVideo" className="video-js" preload="auto"></video>
                </div>
                <button onClick={() => {
                    this.setState({
                        isShow: true,
                        animation: 'up'
                    })
                }}>up</button>
                <button onClick={() => {
                    this.setState({
                        isShow: true,
                        animation: 'left'
                    })
                }}>left</button>
                <button onClick={() => {
                    this.setState({
                        isShow: true,
                        animation: 'right'
                    })
                }}>right</button>
                <button onClick={() => {
                    this.setState({
                        isShow: true,
                        animation: 'scale'
                    })
                }}>scale</button>
                <button onClick={() => {
                    this.setState({
                        isShow: true,
                        animation: 'bottom'
                    })
                }}>bottom</button>
                <Shade
                    isShow={isShow}
                    animation={animation}
                    hide={() => this.setState({ isShow: false})}>
                    <div style={{ background: "#fff", height: "100%", minHeight: '400px', minWidth: '5rem' }}>
                        Shade
                </div>
                </Shade>
            </div>
            
        )
    }
}

export default VideoM3u8