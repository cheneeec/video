import {NgModule} from '@angular/core';

import {PlayerRoutingModule} from './player-routing.module';
import {ShareModule} from "../share/share.module";
import {PlayerListComponent} from './player-list/player-list.component';
import {WatchComponent} from './watch/watch.component';


@NgModule({
    declarations: [PlayerListComponent, WatchComponent],
    imports: [
        ShareModule,
        PlayerRoutingModule


    ],
    providers:[]
})
export class PlayerModule {
}
