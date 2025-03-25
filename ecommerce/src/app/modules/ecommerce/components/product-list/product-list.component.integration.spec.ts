import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '@core/services/product/product.service';
import { mockProductList } from '@shared/testing/data/product.test.data';

import { ProductListComponent } from './product-list.component';

describe('Integration: ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ProductListComponent],
      providers: [
        ProductService,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product list', done => {
    const productListSpy = jest.spyOn(productService, 'getProductList');
    expect(productListSpy).not.toHaveBeenCalled();
    component.products$.subscribe((a) => {
      expect(a).toBe(null);
      fixture.detectChanges();
      component.products$.subscribe(async (b) => {
        await new Promise((r) => setTimeout(r, 1000));
        expect(productListSpy).toHaveBeenCalledTimes(1);
        expect(b).toStrictEqual(mockProductList);
        fixture.detectChanges();
        expect(document.querySelectorAll('tr[id^=product_list__table__item-]').length).toBe(mockProductList.length);
        for (let i = 0; i < mockProductList.length; i++) {
          expect(document.querySelector(`td[id=product_list__table__item-${i}__product_id]`)?.textContent).toBe(mockProductList[i].id);
          expect(document.querySelector(`td[id=product_list__table__item-${i}__product_name]`)?.textContent).toBe(mockProductList[i].name);
          expect(document.querySelector(`td[id=product_list__table__item-${i}__product_price]`)?.textContent).toBe(mockProductList[i].price.amount + " " + mockProductList[i].price.currency);
        }
        done();
      });
    });
  });

  it('should not display deleted product', done => {
    const productDeleteSpy = jest.spyOn(productService, 'deleteProduct');
    component.products$.subscribe((a) => {
      expect(a).toBe(null);
      fixture.detectChanges();
      component.products$.subscribe((b) => {
        expect(b).toStrictEqual(mockProductList);
        const deletedId = Number(mockProductList[0].id);
        component.deleteProduct(deletedId);
        expect(productDeleteSpy).toHaveBeenCalledWith(deletedId);
        done();
      });
    });
  });
});
