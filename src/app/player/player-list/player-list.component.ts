import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlayerListService} from "./player-list.service";
import {catchError, flatMap, tap} from "rxjs/operators";
import {Video} from "../../domain/video.model";
import {of} from "rxjs";
import {Episode} from "../../domain/episode.model";

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
    //存放所有剧集列表
    episodes: object[] = [];
    //存放当前播放的剧集
    currentEpisode: object;

    //当前正在播放的剧集
    @Output() $playEpisode = new EventEmitter<object>();

    message: string;


    constructor(private playerListService: PlayerListService) {
    }

    @Input('video')  //需要解析的视频
    set video(currentVideo: Video) {
        if (!currentVideo) {
            return;
        }

        if (currentVideo['single']) {
            this.episodes.push(currentVideo);
            this.playEpisode(currentVideo);

        } else {
            //组建其他属性
            let otherProperties = {};
            switch (currentVideo.platform) {
                case 'IQIYI':
                    otherProperties['albumId'] = currentVideo.albumId;
                    break;
                //TODO　其他平台

            }

            this.playerListService.findEpisodes(currentVideo.playValue, otherProperties)
                .pipe(
                    catchError(e => {
                        if ((<string>e.error['message']).startsWith('extract failed for value:')) {
                            this.message = '获取播放列表失败';
                        }
                        return of([ JSON.parse(JSON.stringify(currentVideo))]);
                    }),
                    tap(eps => this.playEpisode(eps[0])),//默认播放第一条
                    flatMap(v=>v)
                ).subscribe(e => this.episodes.push(e));
        }
    }


    ngOnInit() {


    }


    playEpisode(episode: object): void {
        this.currentEpisode = episode;
        this.$playEpisode.emit(this.currentEpisode);
    }

}
