import {Component, Input, OnInit} from '@angular/core';
import {Video} from "../../domain/video.model";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

    @Input() item: Video;

    constructor() {
    }


    ngOnInit() {
    }


}
