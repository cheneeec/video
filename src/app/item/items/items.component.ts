import {Component, OnInit} from '@angular/core';
import {ItemsService} from "./items.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap, tap} from "rxjs/operators";
import {interval, Observable} from "rxjs";
import {ResponsePage} from "../../domain/response-page.model";
import {ProgressBarValueService} from "../../share/progress-bar-value.service";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    itemsPageResponse$: Observable<ResponsePage<object>>;

    constructor(private itemsService: ItemsService,
                private activatedRoute: ActivatedRoute,
                private progressBarService: ProgressBarValueService) {

    }

    ngOnInit() {

        this.itemsPageResponse$ = this.activatedRoute.queryParams
            .pipe(
                tap(() => this.progressBarService.loading()),
                switchMap(queryParams => this.itemsService.findAll(
                    this.activatedRoute.snapshot.data['category'], {
                        page: queryParams['page'],
                        size: queryParams['size']
                    })
                ),
                tap(()=>this.progressBarService.loadCompleted())
            );

    }


}
