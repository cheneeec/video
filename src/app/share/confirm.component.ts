import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-confirm',
    template: `
        <div>
            <div mat-dialog-title>
                {{data['title']}}
            </div>
            <mat-dialog-content style="text-align:start;">
                {{data['content']}}
            </mat-dialog-content>

            <mat-dialog-actions class="button" style="float: right;">
                <button mat-button color="accent" (click)="dialog.close(true);">{{data.confirmButton || '确认'}}</button>
                <button mat-button color="accent" (click)="dialog.close(false);">{{data.closeButton || '关闭'}}</button>
            </mat-dialog-actions>
        </div>
    `
})
export class ConfirmComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { content: string, title?: string, closeButton?: string, confirmButton?: string },
        public dialog: MatDialogRef<ConfirmComponent>
    ) {
    }

    ngOnInit() {

    }

}
