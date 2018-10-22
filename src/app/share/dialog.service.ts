import {Component, Inject, Injectable, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    alert(data: { content: string, title?: string, closeButton?: string }, width?: string): Observable<void> {
        return this.dialog.open(AlertComponent, {
            data: data,
            width: width || '39%',
            role:'alertdialog'
        }).afterClosed();
    }

    confirm(data: { content: string, title?: string, closeButton?: string, confirmButton?: string }, width?: string): Observable<boolean> {
        return this.dialog.open(ConfirmComponent, {
            data: data,
            width: width || '39%',
            role:'alertdialog',
            disableClose:true

        }).afterClosed();
    }

}
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