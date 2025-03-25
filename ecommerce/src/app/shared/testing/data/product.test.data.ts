import { HttpResponse } from "@angular/common/http";
import { Price } from "@core/models/price.model";
import { Product } from "@core/models/product.model";

export const mockProductId = 17035535;
export const mockProductName = 'Cheap product';
export const mockProductPriceAmount = 9.99;
export const mockProductPriceCurrency = 'EUR';
export const mockProductPrice = new Price(9.99, 'EUR');
export const mockProduct = new Product(mockProductId, mockProductName, mockProductPrice);

export const mockProductResponseBody = {
  'id': mockProductId,
  'name': mockProductName,
  'price': mockProductPrice
}

export const mockProductResponseBodyPost = {
  'name': 'Not so cheap product',
  'price': new Price(19.99, 'EUR'),
}

export const mockProductResponseBodyPut = {
  'name': 'Inexpensive product',
  'price': new Price(10.99, 'EUR'),
}

export const mockProductListResponseBody = {
  "products": [
    {
      "id": "17035535",
      "name": "Cheap product",
      "price": {
        "amount": "9.99",
        "currency": "EUR"
      }
    },
    {
      "id": "17005954",
      "name": "Quality product",
      "price": {
        "amount": "29.99",
        "currency": "EUR"
      }
    }
  ]
};

export const mockProductList = mockProductListResponseBody.products;
export const mockProductEmptyHTTPResponse = new HttpResponse({
    statusText: 'OK',
    status: 204,
});
