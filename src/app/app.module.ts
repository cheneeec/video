import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {ShareModule} from "./share/share.module";
import {ItemModule} from "./item/item.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      ShareModule,
      BrowserModule,
      CoreModule,
      ItemModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
