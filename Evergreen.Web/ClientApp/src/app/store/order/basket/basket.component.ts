import { Component, OnInit } from '@angular/core';
import {BasketService} from "../../../services/basket.service";
import {OrderLine} from "../../../models/order-line";
import {OrderService} from "../../../services/order.service";
import {BehaviorSubject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {map} from "rxjs/operators";

export interface BasketLine {
  productName: string;
  quantity: number;
  cost: number;
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket = new MatTableDataSource<OrderLine>();
  basket$: BehaviorSubject<OrderLine[]> = new BehaviorSubject<OrderLine[]>([]);
  orderTotal$;

  constructor(private basketService: BasketService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.basket.data = this.basketService.getLines();
    this.getProductTotal();
  }

  getProductTotal(): void {
    this.orderTotal$ = this.orderService.getOrderTotal({
      products: this.basket.data
    }).pipe(
      map(t => {
        if (t == 0) return 0;
        return (t / 100).toFixed(2);
      })
    )
  }

  onRemoveProduct(ol: OrderLine) {
    this.basketService.removeLine(ol);
    this.basket.data = this.basketService.getLines();

    this.getProductTotal();
  }

}
