import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header-default',
    templateUrl: './header-default.component.html',
    styleUrls: ['./header-default.component.scss']
})
export class HeaderDefaultComponent implements OnInit {

    keyword: string;

    @Output() onSearch = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    submitSearchForm() {
        if(this.keyword){
            this.onSearch.emit(this.keyword);
        }
    }

}
