import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Observable} from "rxjs";
import {ProductCategory} from "../../../models/product-category";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {concatMap, map} from "rxjs/operators";
import {BasketService} from "../../../services/basket.service";
import {Product} from "../../../models/product";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productCat$: Observable<ProductCategory>;
  basket;

  constructor(private productService: ProductService,
              private basketService: BasketService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.basket = this.basketService.getLines();

    this.productCat$ = this.activeRoute.paramMap.pipe(
      concatMap((x: ParamMap) => {
        return this.productService.getProductsInCategory(x.get('id'))
      })
    );
  }

  onClickAddToBasket(p: Product) {
    let message;

    if (this.basketService.hasProduct(p.id)) {
      let currentQuantity = this.basketService.getBasketOrderLine(p.id).quantity;

      this.basketService.updateQuantity(p.id, ++currentQuantity);
      message = `Added another ${p.title} to your basket`;
    }
    else {
      this.basketService.addLine({
        productId: p.id,
        costPerItem: p.cost,
        productTitle: p.title,
        quantity: 1
      });
      message = `Added ${p.title} to your basket`;
    }

    this.snackBar.open(message, 'View basket', {
      duration: 3500
    }).onAction().subscribe(() => {
      this.router.navigate(['/basket'])
    })
  }

}
