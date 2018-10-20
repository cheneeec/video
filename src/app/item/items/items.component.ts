import {Component, OnInit} from '@angular/core';
import {ItemsService} from "./items.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ResponsePage} from "../../domain/response-page.model";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    itemsPageResponse$: Observable<ResponsePage<object>>;

    constructor(private itemsService: ItemsService, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {

        this.itemsPageResponse$ = this.activatedRoute.queryParams
            .pipe(
                switchMap(queryParams => this.itemsService.findAll(
                    this.activatedRoute.snapshot.data['category'], {
                        page: queryParams['page'],
                        size: queryParams['size']
                    }
                    )
                )
            )


    }


}
