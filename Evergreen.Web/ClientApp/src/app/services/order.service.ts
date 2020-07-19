import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateOrder} from "../models/create-order";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrderTotal(order: CreateOrder): Observable<number> {
    return this.httpClient.post('/api/order/total', order).pipe(
      map((response: any) => {
        return response.total;
      })
    )
  }

  createOrder(order: CreateOrder): Observable<number> {
    return this.httpClient.post('/api/order', order).pipe(
      map((response: any) => {
        return response.orderId;
      })
    );
  }

  getOrdersPendingCollection(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`/api/order/search?status=AWAITING_COLLECT`)
  }

  setOrderStatus(orderId: number, newStatus: string): Observable<boolean> {
    return this.httpClient.put<boolean>(`/api/order/${orderId}/status?newStatus=${newStatus}`, null)
      .pipe(
        map((r: any) => {
          return r.success;
        })
      );
  }
}
