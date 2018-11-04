import {Component, OnInit} from '@angular/core';
import {IPlayable} from "videogular2/src/core/vg-media/i-playable";
import {ActivatedRoute} from "@angular/router";
import {PlayerService} from "./player.service";
import {filter, map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {


    value$: Observable<string[]>;

    constructor(private activatedRoute: ActivatedRoute,
                private playerService: PlayerService) {
    }


    ngOnInit() {
        this.value$ = this.activatedRoute.queryParams
            .pipe(
                map(q => q['v']),
                filter(v => !!v),
                switchMap(v => this.playerService.parsePlayValue(v))
            );

    }

}
