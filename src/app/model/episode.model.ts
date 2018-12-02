import {Video} from "./video.model";

export interface Episode extends Video {
    number: number; //集数
    shortDescription: string;  //短的剧集描述
    description:string; //剧集描述
    duration:number; //播放时长(以秒为单位)
}