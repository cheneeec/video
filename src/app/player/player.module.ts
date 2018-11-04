import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayerRoutingModule} from './player-routing.module';
import {ShareModule} from "../share/share.module";
import {VgCoreModule} from "videogular2/core";
import {VgControlsModule} from "videogular2/controls";
import {VgOverlayPlayModule} from "videogular2/overlay-play";
import {VgBufferingModule} from "videogular2/buffering";
import { PlayerComponent } from './player/player.component';

@NgModule({
    declarations: [PlayerComponent],
    imports: [
        ShareModule,
        PlayerRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ]
})
export class PlayerModule {
}
