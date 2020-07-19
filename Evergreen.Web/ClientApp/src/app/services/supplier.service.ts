import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supplier} from "../models/supplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpClient: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(`api/supplier`);
  }
}
