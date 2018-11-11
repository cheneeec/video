import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

    @Input() item: object;

    constructor(private router: Router) {
    }


    ngOnInit() {
    }


    watch(): void {
        let url = this.item['playValue'];
        //兼容IQIYI
        if (this.item['albumId']) {
            url += `?albumId=${this.item['albumId']}` ;
        }
        this.router.navigate(['watch'],{
            queryParams:{
                v:url
            }
        })
    }
}
