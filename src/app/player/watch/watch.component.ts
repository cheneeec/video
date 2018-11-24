import {Component, OnDestroy, OnInit} from '@angular/core';
import {WatchService} from "./watch.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import DPlayer from "dplayer";
import {Episode} from "../../domain/episode.model";

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {


    //当前需要播放的剧集（真实播放），传给app-player
    currentVideo: object;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

    //播放器实例
    private dplayer: DPlayer;

    constructor(private watchService: WatchService,
                private activatedRoute: ActivatedRoute,
                private breakpointObserver: BreakpointObserver) {
    }


    ngOnInit() {
        this.activatedRoute.queryParams
            .pipe(
                filter(queryParams => !queryParams['single']),
                switchMap(queryParams => this.watchService.parsePlayValue(queryParams['playValue']))
            ).subscribe(values => this.dplayer = WatchComponent.createDPlayer(values))

    }

    ngOnDestroy(): void {
        if (this.dplayer)
            this.dplayer.destroy();
    }

    onPlay(episode: Episode): void {

        this.currentVideo = episode;

        this.watchService.parsePlayValue(episode.playValue)
            .subscribe(values => {
                if (!this.dplayer) {
                    this.dplayer = WatchComponent.createDPlayer(values)
                } else {
                    this.dplayer.switchVideo({url: values[0]}, null);
                    this.dplayer.play();
                }

            })

    }


    private static createDPlayer(values: string[]) {
        return new DPlayer({
            container: document.getElementById('dplayer'),
            screenshot: true,
            autoplay: true,
            video: {
                url: values[0]
            }

        });
    }


}
