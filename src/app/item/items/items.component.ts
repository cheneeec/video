import {Component, ElementRef, OnInit} from '@angular/core';
import {ItemsService} from "./items.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/overlay";
import {ResponsePage} from "../../domain/response-page.model";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    items$: Observable<object[]>;

    page$: Observable<number>;

    constructor(private itemsService: ItemsService,
                private activatedRoute: ActivatedRoute,
                private scrollDispatcher: ScrollDispatcher) {
    }


    ngOnInit() {

        const responsePage$ = this.activatedRoute.queryParams
            .pipe(
                switchMap(queryParams => this.doHttpRequest(queryParams['page'], queryParams['size'])),
            );

        this.items$ = responsePage$.pipe(map(responsePage => responsePage.content));
        this.page$ = responsePage$.pipe(map(responsePage => responsePage.number));

        this.scrollDispatcher
            .scrolled(800)
            .subscribe((scrollable: CdkScrollable) => {
                console.log('發生scroll了，來源為：');
                console.log('body scrollHeight:' + document.body.scrollHeight);
                console.log('body offsetHeight:' + document.body.offsetHeight);
                console.log('body clientHeight:' + document.body.clientHeight);
                console.log('documentElement scrollHeight:' + document.documentElement.scrollHeight);
                console.log('documentElement offsetHeight:' + document.documentElement.offsetHeight);
                console.log('scrollingElement clientHeight:' + document.scrollingElement.clientHeight);
                console.log('scrollingElement scrollHeight:' + document.scrollingElement.scrollHeight);

                console.log('===========');
                console.log(document.body.scrollTop);
                console.log(document.body.scrollWidth);
                console.log(document.body.scrollWidth + document.body.scrollTop);
                console.log("==============================");

                // console.log(+document.getElementById('content').scrollHeight)
                /* if(document.getElementById('content').scrollHeight>900){
                     this.doHttpRequest({
                         page:1,
                         size:16
                     }).subscribe(c=>console.log(c))
                 }*/

            });


    }


    private doHttpRequest(page?: number, size?: number): Observable<ResponsePage<object>> {
        return this.itemsService.findAll(
            this.activatedRoute.snapshot.data['category'], {
                page: page,
                size: size
            })
    }


}
