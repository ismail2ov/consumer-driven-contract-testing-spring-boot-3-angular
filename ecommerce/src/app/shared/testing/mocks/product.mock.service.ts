import { Injectable } from '@angular/core';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product/product.service';
import { Observable, of } from 'rxjs';

import { mockProduct, mockProductList } from '../data/product.test.data';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceMock extends ProductService {

  getProduct(_id: number): Observable <Product> {
    return of(mockProduct);
  }

  deleteProduct(_id: number): Observable <any> {
    return of(true);
  }

  postNewProduct(_product: Product): Observable<any> {
    return of(true);
  }

  putUpdateProduct(_product: Product): Observable<any> {
    return of(true);
  }

  getProductList(): Observable<Product[]> {
    return of(mockProductList);
  }
}
