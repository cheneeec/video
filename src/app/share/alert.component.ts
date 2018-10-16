import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-alert',
    template: `
        <div>
            <div mat-dialog-title>
                {{data['title']}}
            </div>
            <mat-dialog-content style="text-align:start;">
                {{data['content']}}
            </mat-dialog-content>

            <mat-dialog-actions class="button" style="float: right;">
                <button mat-button color="accent" mat-dialog-close="">{{data.closeButton||'关闭'}}</button>
            </mat-dialog-actions>
        </div>
    `
})
export class AlertComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data:{ content: string, title?: string, closeButton?: string }) {

    }


    ngOnInit() {
    }

}
