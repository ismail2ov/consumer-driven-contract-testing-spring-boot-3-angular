import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Price } from '@core/models/price.model';
import { Product } from '@core/models/product.model';
import { ProductService } from "@core/services/product/product.service";
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {

  isEdit = false;
  productForm: Product
  productId = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = new Product(17035535, 'Inexpensive product', new Price(10.99, 'EUR'));
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.productService.getProduct(params['id']).pipe(takeUntil(this.destroy$)).subscribe((u) => {
          this.productForm = u;
        });
        this.isEdit = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  doNewProduct() {
    this.productService.postNewProduct(this.productForm).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigateByUrl('/product/list')
    });
  }

  doUpdateProduct() {
    this.productService.putUpdateProduct(this.productId, this.productForm).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigateByUrl('/product/list')
    });
  }

}
