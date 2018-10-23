import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule
} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MouseEnterAddClass} from "./mouse-enter-add-class.directive";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AlertComponent, ConfirmComponent} from "./dialog.service";
import {ScrollDispatchModule} from "@angular/cdk/scrolling";

@NgModule({
    imports: [
        CommonModule, //只在sharedModule中导入和导出module
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSidenavModule,
        MatMenuModule,
        MatListModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatChipsModule,

        ScrollDispatchModule,

        LayoutModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        FlexLayoutModule,


        HttpClientModule,
        ReactiveFormsModule


    ],
    exports: [
        CommonModule,

        //mat
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSidenavModule,
        MatMenuModule,
        MatListModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatChipsModule,
        MatBadgeModule,
        ScrollDispatchModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,


        LayoutModule,
        FlexLayoutModule,

        //angular
        HttpClientModule,
        ReactiveFormsModule,

        //custom add
        MouseEnterAddClass

    ],
    declarations: [MouseEnterAddClass, AlertComponent, ConfirmComponent],
    entryComponents:[AlertComponent,ConfirmComponent]
})
export class ShareModule {
}
