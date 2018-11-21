import {NgModule} from '@angular/core';
import {ShareModule} from "../share/share.module";
import {ItemComponent} from './item/item.component';
import {ItemRoutingModule} from "./item-routing.module";
import { ItemsComponent } from './items/items.component';
import { ResultComponent } from './result/result.component';

@NgModule({
    imports: [
        ShareModule,
        ItemRoutingModule,
    ],
    declarations: [ItemComponent, ItemsComponent, ResultComponent]
})
export class ItemModule {
}
