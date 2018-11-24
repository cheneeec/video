import {NgModule, Optional, SkipSelf} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {ShareModule} from "../share/share.module";
import {AppRoutingModule} from "./app-routing.module";
import { HeaderDefaultComponent } from './header/header-default/header-default.component';
import { HeaderHandsetComponent } from './header/header-handset/header-handset.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        ShareModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [SidebarComponent, HeaderComponent, HeaderDefaultComponent, HeaderHandsetComponent],
    exports: [HeaderComponent, SidebarComponent, AppRoutingModule] //必须导出供外部使用
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule) {//@Optional():依赖可选
        if (parent) {
            throw new Error('模块已经存在');
        }

    }
}
