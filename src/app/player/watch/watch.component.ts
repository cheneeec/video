import {Component, OnInit} from '@angular/core';
import {Video} from "../../domain/video.model";
import {WatchService} from "./watch.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

    //获取当前需要播放的视频
    video$: Observable<Video>;
    //当前需要播放的剧集（真实播放），传给app-player
    currentRealPlay: object;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

    constructor(private watchService: WatchService, private activatedRoute: ActivatedRoute,private breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        //当前播放的视频
        this.video$ = this.activatedRoute.params.pipe(
            map(params => params['id']),
            filter(id => !!id),
            switchMap(id => this.watchService.get(id)),
            tap(video=>{
                if(video.single){
                    this.currentRealPlay=video;
                }
            })
        );


    }


}
