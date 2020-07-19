import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StoreLayoutComponent} from './store-layout/store-layout.component';
import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {BasketComponent} from './order/basket/basket.component';
import {CheckoutComponent} from './order/checkout/checkout.component';
import {CheckoutGuard} from "./order/checkout/checkout.guard";


const routes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'product/category/:id', component: ProductListComponent},
      {path: 'basket', component: BasketComponent},
      {path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
