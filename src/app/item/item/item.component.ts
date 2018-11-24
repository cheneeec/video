import {Component, Input, OnInit} from '@angular/core';
import {Video} from "../../domain/video.model";
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
        let queryParams = {};
        queryParams['playValue'] = this.item.playValue;
        queryParams['single'] = this.item.single;
        this.item.properties;
        for (let property in this.item.properties) {
            queryParams[property] = this.item.properties[property]
        }
        this.router.navigate(['/watch'], {
            queryParams: queryParams
        })
    }

}
