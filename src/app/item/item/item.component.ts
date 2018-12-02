import {Component, Input, OnInit} from '@angular/core';
import {Video} from "../../model/video.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

    @Input() item: Video;

    constructor(private router: Router) {
    }


    ngOnInit() {
    }

    watch(): void {
        const queryParams = {};
        if (this.item.single) {
            queryParams['v'] = this.item.rawValue;
        } else
            queryParams['playList'] = this.item.rawValue;


        Object.assign(queryParams,this.item.properties);

        this.router.navigate(['/watch'], {
            queryParams: queryParams
        })

    }

}
