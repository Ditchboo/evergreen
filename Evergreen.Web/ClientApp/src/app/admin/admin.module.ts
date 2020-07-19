import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import { EditProductComponent } from './product/edit-product/edit-product.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    EditProductComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule
  ]
})
export class AdminModule { }
