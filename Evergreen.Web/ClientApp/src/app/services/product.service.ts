import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductCategory} from '../models/product-category';
import {CreateProduct} from "../models/create-product";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(`/api/productcategory`);
  }

  getProductById(id: string) {
    return this.httpClient.get<Product>(`/api/product/${id}`);
  }

  getProductsInCategory(id: string): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(`/api/product/category/${id}`);
  }

  createProduct(newProduct: CreateProduct): Observable<Product> {
    return this.httpClient.post<Product>('/api/product', newProduct);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/product');
  }

  updateProduct(updatedProduct: CreateProduct): Observable<Product> {
    return this.httpClient.put<Product>('/api/product', updatedProduct);
  }

  setAvailability(productId: number, available: boolean) {
    return this.httpClient.put<Product>(`/api/product/availability/${productId}?available=${available}`, null);
  }
}
