import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {ShareModule} from "./share/share.module";
import {ItemModule} from "./item/item.module";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
      ShareModule,
      BrowserModule,
      CoreModule,
      ItemModule,
      LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
