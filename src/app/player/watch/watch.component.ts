import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Episode} from "../../domain/episode.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

    currentEpisode:Episode;

    constructor(private activatedRoute:ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.data
            .subscribe(v=>console.log(v,'data','watch'));
    }


}
