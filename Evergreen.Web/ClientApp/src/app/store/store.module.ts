import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {BasketComponent} from './order/basket/basket.component';
import {CheckoutComponent} from './order/checkout/checkout.component';
import { StoreLayoutComponent } from './store-layout/store-layout.component';
import {SharedModule} from '../shared/shared.module';
import {StoreRoutingModule} from './store-routing.module';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent,
    BasketComponent,
    CheckoutComponent,
    StoreLayoutComponent
  ],
  imports: [
    SharedModule,
    StoreRoutingModule,
    MatMenuModule
  ]
})
export class StoreModule { }
