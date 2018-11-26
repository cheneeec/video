import {Component, OnDestroy, OnInit} from '@angular/core';
import {WatchService} from "./watch.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, pluck, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import DPlayer from "dplayer";

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {


    //当前需要播放的剧集（真实播放），传给app-player
    currentVideo: object;

    readonly isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

    //播放器实例
    private  dplayer: DPlayer;

    constructor(private watchService: WatchService,
                private activatedRoute: ActivatedRoute,
                private breakpointObserver: BreakpointObserver) {

    }


    ngOnInit() {

        this.activatedRoute.queryParams
            .pipe(
                pluck('v'),
                filter(v => !!v),
                switchMap((v: string) => this.watchService.parsePlayValue(v))
            ).subscribe(value => this.play(value))

    }

    ngOnDestroy(): void {
        if (this.dplayer)
            this.dplayer.destroy();
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

    private play(value: string[]) {
        if (this.dplayer) {
            this.dplayer.switchVideo({
                url: value[0]
            }, null);
            this.dplayer.play();
        } else
            this.dplayer = WatchComponent.createDPlayer(value);
    }
}
