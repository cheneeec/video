import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemsComponent} from "./items/items.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
    {
        path: 'movie',
        component: ItemsComponent,
        data: {
            category: 'movie'
        }
    },
    {
        path: 'animation',
        component: ItemsComponent,
        data: {
            category: 'animation'
        }
    },
    {
        path: 'results',
        component: ResultComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule {

}