import { Price } from "./price.model";

export class Product {

  id: number;
  name: string;
  price: Price;

  constructor(
    id: number, name: string, price: Price
  ) {
    this.id = id
    this.name = name
    this.price = price
  }
}
