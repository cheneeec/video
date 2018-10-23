import {Component, ElementRef, OnInit} from '@angular/core';
import {ItemsService} from "./items.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import { Observable} from "rxjs";
import {ResponsePage} from "../../domain/response-page.model";
import {ScrollDispatcher} from "@angular/cdk/overlay";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    itemsPageResponse$: Observable<ResponsePage<object>>;

    constructor(private itemsService: ItemsService,
                private activatedRoute: ActivatedRoute,
                private elementRef: ElementRef,
                private scrollDispatcher: ScrollDispatcher) {

    }

    ngOnInit() {

        this.itemsPageResponse$ = this.activatedRoute.queryParams
            .pipe(
                switchMap(queryParams => this.itemsService.findAll(
                    this.activatedRoute.snapshot.data['category'], {
                        page: queryParams['page'],
                        size: queryParams['size']
                    })
                )
            );

        setTimeout(()=>{
            console.log(this.elementRef);
            console.log(this.scrollDispatcher.scrollContainers);
            this.scrollDispatcher
                .ancestorScrolled(this.elementRef,800)
                .subscribe((scrollable) => {
                    console.log('發生scroll了，來源為：');
                    console.log(scrollable)
                });
        },2000)


    }


}
