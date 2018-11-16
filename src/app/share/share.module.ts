import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatCardModule, MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {MouseEnterAddClass} from "./mouse-enter-add-class.directive";
import {AlertComponent, ConfirmComponent} from "./dialog.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import { PlayTimePipe } from './play-time.pipe';

@NgModule({
    imports: [
        CommonModule, //只在sharedModule中导入和导出module
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatFormFieldModule,
        MatMenuModule,
        MatChipsModule,

        MatProgressSpinnerModule,
        MatProgressBarModule,

        FlexLayoutModule,


        HttpClientModule,


    ],
    exports: [
        CommonModule, //只在sharedModule中导入和导出module
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatFormFieldModule,
        MatMenuModule,
        MatChipsModule,

        MatProgressSpinnerModule,
        MatProgressBarModule,

        FlexLayoutModule,


        HttpClientModule,

        //Directive
        MouseEnterAddClass,

        //Pipe
        PlayTimePipe

    ],
    declarations: [MouseEnterAddClass, AlertComponent, ConfirmComponent, PlayTimePipe],
    entryComponents:[AlertComponent,ConfirmComponent]
})
export class ShareModule {
}
