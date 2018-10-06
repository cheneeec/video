import {NgModule} from '@angular/core';
import {ShareModule} from "../share/share.module";
import {ItemComponent} from './item/item.component';
import {ItemRoutingModule} from "./item-routing.module";
import { ItemsComponent } from './items/items.component';

@NgModule({
    imports: [
        ShareModule,
        ItemRoutingModule
    ],
    declarations: [ItemComponent, ItemsComponent]
})
export class ItemModule {
}
