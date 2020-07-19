import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from "rxjs";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";


export interface Collection {
  firstName: string;
  lastName: string;
  telephone: string;
  items: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  collections: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  inventory: MatTableDataSource<Product>;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(x => {
      this.inventory = new MatTableDataSource<Product>(x);
      this.inventory.paginator = this.paginator;
    });

    this.getPendingCollections();
  }

  getPendingCollections(): void {
    this.orderService.getOrdersPendingCollection().subscribe((x) => {
      this.collections.data = x;
    })
  }

  markCollected(order: Order): void {
    this.orderService.setOrderStatus(order.orderId, 'COLLECTED')
      .subscribe(x => {
        this.getPendingCollections();

        this.snackBar.open('Order marked as collected.', null, {
          duration: 3500
        });
      })
  }

  toggleAvailability(p: Product) {
    p.isAvailable = !p.isAvailable;

    this.productService.setAvailability(p.id, p.isAvailable)
      .subscribe(x => {
        this.snackBar.open(`Made ${p.title} ${p.isAvailable ? 'available' : 'unavailable'}`, null, {
          duration: 3500
        });
      })
  }
}
