import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatBadgeModule,
    MatButtonModule, MatCardModule,
    MatChipsModule, MatDialogModule, MatFormFieldModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatSidenavModule, MatSlideToggleModule,
    MatToolbarModule
} from "@angular/material";
import {LayoutModule} from "@angular/cdk/layout";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MouseEnterAddClass} from "./mouse-enter-add-class.directive";

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
        LayoutModule,
        MatBadgeModule,



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
        LayoutModule,

        //angular
        HttpClientModule,
        ReactiveFormsModule,

        //custom add
        MouseEnterAddClass

    ],
    declarations: [MouseEnterAddClass]
})
export class ShareModule {
}
