import {NgModule, Optional, SkipSelf} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {ShareModule} from "../share/share.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    imports: [
        ShareModule,
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    declarations: [SidebarComponent, HeaderComponent],
    exports: [HeaderComponent, SidebarComponent, AppRoutingModule] //必须导出供外部使用
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule) {//@Optional():依赖可选
        if (parent) {
            throw new Error('模块已经存在');
        }

    }
}
