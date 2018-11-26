import {NgModule} from '@angular/core';

import {PlayerRoutingModule} from './player-routing.module';
import {ShareModule} from "../share/share.module";
import {VgCoreModule} from "videogular2/core";
import {VgControlsModule} from "videogular2/controls";
import {VgOverlayPlayModule} from "videogular2/overlay-play";
import {VgBufferingModule} from "videogular2/buffering";
import {PlayerComponent} from './player/player.component';
import {PlayerListComponent} from './player-list/player-list.component';
import {WatchComponent} from './watch/watch.component';
import {VgStreamingModule} from "videogular2/streaming";

@NgModule({
    declarations: [PlayerComponent, PlayerListComponent, WatchComponent],
    imports: [
        ShareModule,
        PlayerRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule,

    ],
    providers:[]
})
export class PlayerModule {
}
