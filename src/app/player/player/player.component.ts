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


    currentEpisode: Episode;

    value$: Observable<string[]>;

    constructor(private playerService: PlayerService) {
    }


    ngOnInit() {


    }

    @Input('currentEpisode')
    set _currentEpisode(currentEpisode: Episode): void {
        if (currentEpisode) {
            this.currentEpisode = currentEpisode;
            this.value$ = this.playerService.parsePlayValue(currentEpisode.playValue);
        }
    }

}
