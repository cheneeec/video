import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsService} from "./items.service";
import {ActivatedRoute} from "@angular/router";
import {distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {ScrollDispatcher} from "@angular/cdk/overlay";
import {ProgressSpinnerStatusService} from "../../share/progress-spinner-status.service";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {


    items: object[] = [];

    private nextPage: number = 0;

    private currentSize = 16;

    lastPage: boolean;


    viewContainer = document.getElementsByClassName('view-container').item(0);


    constructor(private itemsService: ItemsService,
                private activatedRoute: ActivatedRoute,
                private scrollDispatcher: ScrollDispatcher,
                private  progressSpinnerStatusService: ProgressSpinnerStatusService) {
    }


    ngOnInit() {

        const activatedRouteSnapshot = this.activatedRoute.snapshot;
        const category = activatedRouteSnapshot.data['category'];
        const queryParams = activatedRouteSnapshot.queryParams;

        this.itemsService.findAll(category,
            {
                page: queryParams['page'],
                size: queryParams['size']
            }).subscribe(responsePage => {
            this.items = responsePage.content;
            this.nextPage = ++responsePage.number;
            this.currentSize = responsePage.size;
            this.lastPage = responsePage.last;
        });



        this.scrollDispatcher
            .scrolled(800)
            .pipe(
                filter(() => (document.documentElement.clientHeight + document.documentElement.scrollTop > this.viewContainer.scrollHeight - 20) && !this.lastPage),
                map(() => this.nextPage),
                distinctUntilChanged(),
                tap(()=>this.progressSpinnerStatusService.loading()),
                switchMap(requestPage => this.itemsService.findAll(category, {
                    page: requestPage,
                    size: this.currentSize
                })),
            )
            .subscribe(pageResponse => {
                pageResponse.content.forEach(item => this.items.push(item));
                this.nextPage = ++pageResponse.number;
                this.lastPage = pageResponse.last;
                this.progressSpinnerStatusService.loadCompleted();
            });

    }


    ngOnDestroy(): void {

    }


}
