import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Price } from '@core/models/price.model';
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product/product.service';
import { mockProduct, mockProductId, mockProductName } from '@shared/testing/data/product.test.data';
import { of } from 'rxjs';

import { routes } from '../../ecommerce-routing.module'


import { ProductFormComponent } from './product-form.component';


describe('Integration: ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;
  let route: ActivatedRoute;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ProductFormComponent],
      providers: [
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ undefined }),
          },
        },
      ],
    }).compileComponents();

    productService = TestBed.inject(ProductService);
    route = TestBed.inject(ActivatedRoute);
  });


  it('should create', () => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should add product', () => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.productForm).toStrictEqual(new Product(17035535, 'Inexpensive product', new Price(10.99, 'EUR')));
    const productNewSpy = jest.spyOn(productService, 'postNewProduct');
    const idInput = fixture.debugElement.query(By.css('#product_form__input-id')).nativeElement;
    idInput.value = mockProductId;
    idInput.dispatchEvent(new Event('input'));
    const nameInput = fixture.debugElement.query(By.css('#product_form__input-name')).nativeElement;
    nameInput.value = mockProductName;
    nameInput.dispatchEvent(new Event('input'));
    expect(component.productForm.id).toBe(JSON.stringify(mockProductId));
    expect(component.productForm.name).toBe(mockProductName);
    const newSubmit = fixture.debugElement.query(By.css('#product_form__submit-new')).nativeElement;
    newSubmit.click();
    expect(productNewSpy).toHaveBeenCalledWith(component.productForm);
    fixture.detectChanges();
  });

  it('should update product', () => {
    const productId = 17035535
    route.params = of({ id: productId });
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    const getSpy = jest.spyOn(productService, 'getProduct');
    fixture.detectChanges();
    expect(getSpy).toHaveBeenCalledWith(productId);
    fixture.detectChanges();
    const productUpdateSpy = jest.spyOn(productService, 'putUpdateProduct');
    const idInput = fixture.debugElement.query(By.css('#product_form__input-id')).nativeElement;
    idInput.value = mockProductId;
    idInput.dispatchEvent(new Event('input'));
    const nameInput = fixture.debugElement.query(By.css('#product_form__input-name')).nativeElement;
    nameInput.value = mockProductName;
    nameInput.dispatchEvent(new Event('input'));
    expect(component.productForm.id).toBe(JSON.stringify(productId));
    expect(component.productForm.name).toBe(mockProduct.name);
    const editSubmit = fixture.debugElement.query(By.css('#product_form__submit-edit')).nativeElement;
    editSubmit.click();
    expect(productUpdateSpy).toHaveBeenCalledWith(productId, component.productForm);
    fixture.detectChanges();
  });
});
