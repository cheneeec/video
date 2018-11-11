import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlayerListService} from "./player-list.service";
import {ActivatedRoute} from "@angular/router";
import {filter, first, flatMap, map, share, skip, switchMap, tap} from "rxjs/operators";
import {Episode} from "../../domain/episode.model";
import {Observable} from "rxjs";

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

    episodes: Episode[] = [];
    //当前正在播放
    @Output() $currentEpisode = new EventEmitter<Episode>();
    //当前正在播放
    currentEpisode: Episode;

    constructor(private playerListService: PlayerListService,
                private activatedRoute: ActivatedRoute) {
    }


    ngOnInit() {
        this.activatedRoute.queryParams
            .pipe(
                map(queryParams => queryParams['v']),
                filter(v => !!v),
                switchMap(v => this.playerListService.findEpisodes(v)),
                tap(v => this.playEpisode(v[0])),
                flatMap(v => v)
            ).subscribe(e => this.episodes.push(e));

        //正在播放的值

    }



     playEpisode(episode: Episode): void {
        this.currentEpisode = episode;
        this.$currentEpisode.emit(this.currentEpisode);
    }

}
