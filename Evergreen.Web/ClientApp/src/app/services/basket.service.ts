import { Injectable } from '@angular/core';
import {OrderLine} from "../models/order-line";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private orderLines: OrderLine[];

  constructor() {
    this.orderLines = [];
  }

  addLine(line: OrderLine): void {
    this.orderLines.push(line);
  }

  removeLine(line: OrderLine): void {
    const index = _.findIndex(this.orderLines, (o) => {
      return o.productId === line.productId;
    });

    if (index > -1) {
      this.orderLines.splice(index, 1);
    }
  }

  updateQuantity(productId, quantity): void {
    const index = _.findIndex(this.orderLines, (o) => {
      return o.productId === productId;
    });

    if (index > -1) {
      this.orderLines[index].quantity = quantity;
    }
  }

  getLines() {
    return this.orderLines;
  }

  private getIndex(id: number): number {
    return _.findIndex(this.orderLines, (o) => {
      return o.productId === id;
    });
  }

  hasProduct(id: number): boolean {
    return this.getIndex(id) > -1;
  }

  getBasketOrderLine(id: number): OrderLine {
    const i = this.getIndex(id);
    if (i > -1) {
      return this.orderLines[this.getIndex(id)];
    }

    return null;
  }

}
