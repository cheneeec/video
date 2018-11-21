import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header-handset',
    templateUrl: './header-handset.component.html',
    styles: [`
        .handset-search-input {
            z-index: 2;
            position: absolute;
            left: 0;
            top: 0;
        }
    `]
})
export class HeaderHandsetComponent implements OnInit {

    visible: boolean;

    keyword: string;

    @Output() onSearch = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {

    }

    submitSearchForm(): void {
        if (!this.keyword) return;
        this.onSearch.emit(this.keyword);
        this.visible = false;
    }


}
