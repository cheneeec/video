import {Injectable} from '@angular/core';
import {DialogRole, MatDialog} from "@angular/material";
import {AlertComponent} from "./alert.component";
import {Observable} from "rxjs";
import {ConfirmComponent} from "./confirm.component";

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
