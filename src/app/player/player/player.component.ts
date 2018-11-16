import {Component, Input, OnInit} from '@angular/core';
import {PlayerService} from "./player.service";
import {Observable} from "rxjs";
import {Episode} from "../../domain/episode.model";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {


    _currentVideo: object;

    //当前播放的视频
    values$: Observable<string[]>;

    constructor(private playerService: PlayerService) { }


    ngOnInit() {

    }

    @Input('currentVideo')
    set currentVideo(currentVideo: object) {
        if (currentVideo) {
            this._currentVideo = currentVideo;
            this.values$ = this.playerService.parsePlayValue(currentVideo['playValue']);
        }
    }

}
