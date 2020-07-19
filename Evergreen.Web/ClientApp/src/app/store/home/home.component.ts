import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Observable} from 'rxjs';
import {ProductCategory} from '../../models/product-category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories$: Observable<ProductCategory[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.categories$ = this.productService.getProductCategories();
  }

}
