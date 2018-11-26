import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ScrollDispatcher} from "@angular/cdk/overlay";
import {BehaviorSubject, combineLatest, Observable, of, Subscription} from "rxjs";
import {Video} from "../../domain/video.model";
import {DataListService, dataListServiceFactory} from "./data-list.service";
import {HttpClient} from "@angular/common/http";
import {catchError, filter, map, pluck, retry, scan, switchMap, takeWhile, tap} from "rxjs/operators";
import {DialogService} from "../../share/dialog.service";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    providers: [
        {
            provide: DataListService,
            useFactory: dataListServiceFactory,
            deps: [HttpClient, ActivatedRoute]
        }
    ]
})
export class ItemsComponent implements OnInit, OnDestroy {


    lastPage: boolean = false;

    private  scroll$: Subscription;

    private readonly viewContainer = document.getElementsByClassName('view-container').item(0);

    //=============
    items$: Observable<Video[]>;

    private readonly currentPageSubject = new BehaviorSubject<number>(0);

    private readonly currentPage$ = this.currentPageSubject.asObservable();

    private pageSize: number = 16;


    constructor(private dataListService: DataListService,
                private activatedRoute: ActivatedRoute,
                private scrollDispatcher: ScrollDispatcher,
                private dialogService: DialogService) {
    }


    ngOnInit() {

        this.initializeDataLst();


        this.initializeScroll();


    }


    private initializeDataLst() {
        this.items$ = combineLatest(
            this.activatedRoute.queryParams,
            this.currentPage$
        ).pipe(
            switchMap( //转化
                params => this.dataListService.findAll(params[0], {
                    page: params[1],
                    size: this.pageSize
                })
            ),
            takeWhile(() => !this.lastPage), //当最后一页时，取消发出的值。
            retry(3),//重试三次
            catchError(error => {
                this.dialogService.alert({
                    content: '服务器出错!!!'
                });
                return of();
            }),
            tap(pageResponse =>  this.lastPage = pageResponse && pageResponse['last'] ),//lastPage赋值
            pluck('content'),　//取content
            scan((previousContent, currentContent) => previousContent.concat(currentContent), [])//讲结果进行合并

        );
    }

    private initializeScroll() {
        this.scroll$ = this.scrollDispatcher
            .scrolled(800)
            .pipe(
                filter(() => (document.documentElement.clientHeight + document.documentElement.scrollTop > this.viewContainer.scrollHeight - 90) && !this.lastPage),
                map(() => this.currentPageSubject.getValue())
            ).subscribe(page => this.currentPageSubject.next(page + 1));
    }

    ngOnDestroy(): void {
        if (this.scroll$) {
            this.scroll$.unsubscribe();
        }
    }


}
