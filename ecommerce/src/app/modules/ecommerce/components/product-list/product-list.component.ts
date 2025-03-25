import { Component, OnInit } from '@angular/core';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product/product.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]|null> = of(null);

  constructor(
    protected productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.products$ = this.productService.getProductList();
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.getProductList());
  }
}
