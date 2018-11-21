import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from "./player.service";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, tap} from "rxjs/operators";
import DPlayer, {DPlayerOptions, DPlayerVideo} from "dplayer";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {


    _currentVideo: object;

    //当前播放的视频
    values$: Observable<string[]>;

    _loading:boolean=true;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    private dplayer: DPlayer;



    constructor(private playerService: PlayerService,
                private breakpointObserver: BreakpointObserver) {

    }


    ngOnInit() {


    }

    @Input('currentVideo')
    set currentVideo(currentVideo: object) {
        if (currentVideo) {
            this._currentVideo = currentVideo;
            this.values$ = this.playerService.parsePlayValue(currentVideo['playValue']);

            this.values$
                .pipe(
                    map(values => {
                        this._loading=false;
                        return {
                            container: document.getElementById('dplayer'),
                            screenshot: true,
                            autoplay: true,
                            video: {
                                url: values[0]
                            }
                        }
                    })
                )
                .subscribe(o => this.dplayer = new DPlayer(o))


        }
    }

    ngOnDestroy(): void {
        this.dplayer.destroy();
    }


}
