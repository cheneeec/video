import {Component, OnInit} from '@angular/core';
import {ItemsService} from "./items.service";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ScrollDispatcher} from "@angular/cdk/overlay";
import {ResponsePage} from "../../domain/response-page.model";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    responsePage$: Observable<ResponsePage<object>>;



    viewContainer = document.getElementsByClassName('view-container').item(0);


    constructor(private itemsService: ItemsService,
                private activatedRoute: ActivatedRoute,
                private scrollDispatcher: ScrollDispatcher) {
    }


    ngOnInit() {

        this.responsePage$ = this.activatedRoute.queryParams
            .pipe(
                switchMap(queryParams => this.doHttpRequest(queryParams['page'], queryParams['size'])),
            );


        this.scrollDispatcher
            .scrolled(800)
            .pipe(
                filter(() => document.documentElement.clientHeight + document.documentElement.scrollTop > this.viewContainer.scrollHeight - 20),
         /*       switchMap(() => this.currentPage$.pipe(map(currentPage => currentPage + 1))),
                switchMap(page => this.doHttpRequest(page)),
                map(pageResponse => pageResponse.content),*/
            )
            .subscribe(page => {
                console.log(page);
            });

    }


    private doHttpRequest(page?: number, size?: number): Observable<ResponsePage<object>> {
        console.log(page, 'page');
        return this.itemsService.findAll(
            this.activatedRoute.snapshot.data['category'], {
                page: page,
                size: size
            })
    }


}
