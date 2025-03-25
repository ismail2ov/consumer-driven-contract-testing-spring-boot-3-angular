import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Product } from '@core/models/product.model';
import { LoggerService } from '@core/services/logger/logger.service';
import { mockProductId, mockProductListResponseBody, mockProductResponseBody, mockProductResponseBodyPost, mockProductResponseBodyPut } from '@shared/testing/data/product.test.data';

import { ProductService } from './product.service';

describe('Integration: ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LoggerService,
      ],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get product', done => {
    service.getProduct(mockProductId).subscribe(o => {
      expect(o).toEqual(mockProductResponseBody);
      done();
    });
  });

  it('should delete product', done => {
    service.deleteProduct(17005954).subscribe(o => {
      expect(o).toEqual(null);
      done();
    });
  });

  it('should create product', done => {
    service.postNewProduct(mockProductResponseBodyPost as Product).subscribe(o => {
      expect(o).toEqual(null);
      done();
    });
  });

  it('should update product', done => {
    service.putUpdateProduct(mockProductId, mockProductResponseBodyPut as Product).subscribe(o => {
      expect(o).toEqual(null);
      done();
    });
  });

  it('should get products list', done => {
    service.getProductList().subscribe(o => {
      expect(o).toEqual(mockProductListResponseBody.products);
      done();
    });
  });

});
