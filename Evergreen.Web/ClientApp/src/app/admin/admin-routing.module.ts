import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditProductComponent} from './product/edit-product/edit-product.component';
import {AdminAuthGuard} from '../shared/auth/admin-auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    component: AdminLayoutComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'product/new', component: EditProductComponent},
      {path: 'product/:id', component: EditProductComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
