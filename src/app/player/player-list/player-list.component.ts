import {
    Component, EventEmitter,
    OnInit, Output,

} from '@angular/core';
import {PlayerListService} from "./player-list.service";
import {distinctUntilKeyChanged, filter, map, pluck, switchMap, tap} from "rxjs/operators";
import {Episode} from "../../model/episode.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

    //存放所有剧集列表
    episodes$: Observable<Episode[]>;

    message: string;

    private static readonly _excludeProperties = ['page', 'size', 'single', 'rawValue'];


    readonly playValue$ = this.activatedRoute.queryParams.pipe(pluck('v'));

    @Output() private readonly onEpisode = new EventEmitter<Episode>();


    constructor(private playerListService: PlayerListService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {}



    ngOnInit() {

        const queryParams$ = this.activatedRoute.queryParams;


        this.episodes$ = queryParams$
            .pipe(
                distinctUntilKeyChanged('playList'),//只有当playList改变时才触发
                filter(queryParams=>queryParams['playList']),
                switchMap(queryParams => this.playerListService.findEpisodes(
                    queryParams['playList'],
                    PlayerListComponent.extractOtherProperties(queryParams),
                    {
                        page: queryParams['page'],
                        size: queryParams['size']
                    })
                    .pipe(map(episodes => new Map<string, any>([['result', episodes], ['rawValue', queryParams['rawValue']]])))
                ),
                tap(resultMap => {
                    if (!resultMap.get('rawValue')) {
                        this.playEpisode(resultMap.get('result')[0]);
                    }
                }),
                map(resultMap => resultMap.get('result'))
            );

    }

    private static extractOtherProperties(queryParams: object) {
        const properties = {};
        for (let k in queryParams) {
            if (!PlayerListComponent._excludeProperties.includes(k)) {
                properties[k] = queryParams[k]
            }
        }
        return properties;
    }


    playEpisode(episode: Episode): void {

        this.router.navigate(['./'], {
            relativeTo: this.activatedRoute,
            queryParams: {
                v: episode.rawValue
            },
            queryParamsHandling: 'merge'
        });

        this.onEpisode.emit(episode);
    }


}
