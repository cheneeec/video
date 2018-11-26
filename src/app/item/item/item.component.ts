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
        const queryParams = {};
        if (this.item.single) {
            queryParams['v'] = this.item.playValue;
        } else
            queryParams['playList'] = this.item.playValue;

        for (let property in this.item.properties) {
            queryParams[property] = this.item.properties[property]
        }

        this.router.navigate(['/watch'], {
            queryParams: queryParams
        })

    }

}
