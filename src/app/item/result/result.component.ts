import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {SearchService} from "./search.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
    items: object[] = [];

    private nextPage: number = 0;

    private currentSize = 16;

    lastPage: boolean;

    private scroll$: Subscription;


    viewContainer = document.getElementsByClassName('view-container').item(0);

    constructor(private activatedRoute: ActivatedRoute,
                private searchService: SearchService) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams
            .pipe(
                map(queryParams => queryParams['q']),
                switchMap(q => this.searchService.search(q))
            ).subscribe(responsePage => {
            this.items = responsePage.content;
            this.nextPage = ++responsePage.number;
            this.currentSize = responsePage.size;
            this.lastPage = responsePage.last;
        })
    }

}
