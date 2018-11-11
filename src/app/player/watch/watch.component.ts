import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Episode} from "../../domain/episode.model";

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

    currentEpisode:Episode;

    constructor() {
    }

    ngOnInit() {
    }


}
