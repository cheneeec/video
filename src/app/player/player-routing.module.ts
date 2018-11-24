import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WatchComponent} from "./watch/watch.component";

const routes: Routes = [
    {
        path: 'watch',
        component: WatchComponent,
        data: {
            sidenavOverMode: true,
            sidenavClose: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayerRoutingModule {
}
