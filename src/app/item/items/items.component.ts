import {Component, ElementRef, OnInit} from '@angular/core';
import {ItemsService} from "./items.service";
import {ActivatedRoute} from "@angular/router";
import {debounceTime, distinct, filter, map, switchMap, tap} from "rxjs/operators";
import {fromEvent, Observable} from "rxjs";
import {CdkScrollable, ScrollDispatcher} from "@angular/cdk/overlay";
import {ResponsePage} from "../../domain/response-page.model";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    items$: Observable<object[]>;

    currentPage$: Observable<number>;

    constructor(private itemsService: ItemsService,
                private activatedRoute: ActivatedRoute,
                private scrollDispatcher: ScrollDispatcher,
                private elementRef: ElementRef) {
    }


    ngOnInit() {

        const responsePage$ = this.activatedRoute.queryParams
            .pipe(
                switchMap(queryParams => this.doHttpRequest(queryParams['page'], queryParams['size'])),
            );

        this.items$ = responsePage$.pipe(map(responsePage => responsePage.content));
        this.currentPage$ = responsePage$.pipe(map(responsePage => responsePage.number));

        this.scrollDispatcher
            .scrolled(800)
            .pipe(
                map(() => window.scrollY), //取Y值
                filter(current => current >= document.body.clientHeight - window.innerHeight), //过滤视窗外的滚动
                // distinct(),//去重
                map(y => Math.ceil((y + window.innerHeight) / 2727)) //获取页数
            )
            .subscribe((scrollable) => {
                console.log(document.documentElement.scrollHeight);//代表整个滚动条多长
                console.log(document.getElementsByTagName('mat-sidenav-content').item(0));
                console.log(document.getElementsByTagName('mat-sidenav-content').item(0).scrollHeight);
                console.log("=========")

                console.log(document.getElementsByTagName('mat-sidenav-content').item(0).scrollHeight + 64);
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
