import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@core/models/product.model';
import { LoggerService } from '@core/services/logger/logger.service';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    private _loggerService: LoggerService
  ) {
    this.apiUrl = "http://localhost:8080";
  }


  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/api/products/${id}`).pipe(
      map(response => {
        this._loggerService.logResponse(JSON.stringify(response));
        return response;
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete<any>(`${this.apiUrl}/api/products/${id}`, options).pipe(
      map(response => {
        this._loggerService.logResponse(JSON.stringify(response));
        return response;
      })
    );
  }

  postNewProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/products`, product).pipe(
      map(response => {
        this._loggerService.logResponse(JSON.stringify(response));
        return response;
      })
    );
  }

  putUpdateProduct(productId: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/products/${productId}`, product).pipe(
      map(response => {
        this._loggerService.logResponse(JSON.stringify(response));
        return response;
      })
    );
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/api/products`).pipe(
      map(response => {
        this._loggerService.logResponse(JSON.stringify(response));
        return response.products;
      })
    );
  }
}
