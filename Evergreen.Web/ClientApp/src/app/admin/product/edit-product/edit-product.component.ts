import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../../../services/product.service";
import {Observable, of} from "rxjs";
import {ProductCategory} from "../../../models/product-category";
import {Supplier} from "../../../models/supplier";
import {SupplierService} from "../../../services/supplier.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, concatMap, finalize, switchMap, tap} from "rxjs/operators";
import {Product} from "../../../models/product";
import {CreateProduct} from "../../../models/create-product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editingProduct?: Product = undefined;
  productForm: FormGroup;
  productCategories$: Observable<ProductCategory[]>;
  suppliers$: Observable<Supplier[]>;
  saving = false;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private supplierService: SupplierService,
              private snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.productCategories$ = this.productService.getProductCategories();
    this.suppliers$ = this.supplierService.getSuppliers();

    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(200)]],
      category: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      cost: ['', [Validators.required, Validators.min(0.01), Validators.max(1000)]]
    });

    this.activatedRoute.paramMap.pipe(
      concatMap((paramMap: ParamMap) => {
        return paramMap.has('id') ? paramMap.get('id') : of(null);
      }),
      switchMap((id: any) => {
        if (!id) {
          return of(null);
        }
        return this.productService.getProductById(id)
      }),
      tap((prod: Product) => {
        this.editingProduct = prod;
      })
    ).subscribe((product: Product) => {
      if (product) {
        this.productForm.get('title').patchValue(product.title);
        this.productForm.get('description').patchValue(product.description);
        this.productForm.get('category').patchValue(product.categoryId);
        this.productForm.get('supplier').patchValue(product.supplierId);
        this.productForm.get('cost').patchValue((product.cost / 100).toFixed(2));
      }
    })
  }

  onClickSave() {
    this.saving = true;

    const product: CreateProduct = {
      title: this.productForm.get('title').value,
      description: this.productForm.get('description').value,
      cost: +(parseFloat(this.productForm.get('cost').value) * 100).toFixed(0),
      categoryId: this.productForm.get('category').value,
      supplierId: this.productForm.get('supplier').value
    };

    let updateSub$;
    let message;

    if (this.editingProduct) {
      product.id = this.editingProduct.id;
      message = `Updated ${product.title}.`;
      updateSub$ = this.productService.updateProduct(product);
    }
    else {
      message = `Created ${product.title}.`;
      updateSub$ = this.productService.createProduct(product);
    }

    updateSub$.subscribe((x) => {
      this.saving = false;
      this.snackbar.open(message, null, {
        duration: 3500
      });

      this.router.navigate(['/admin']);
    });
  }
}
