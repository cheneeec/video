import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShareModule} from "./share/share.module";
import {ItemModule} from "./item/item.module";
import {ProgressBarValueInterceptor} from "./ProgressBarValueInterceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        ShareModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        ItemModule,
    ],
    providers: [
        {
            useClass: ProgressBarValueInterceptor,
            provide: HTTP_INTERCEPTORS,
            multi: true
        },
        /*{
            useValue:['/v1/api.aa']
        }*/

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
