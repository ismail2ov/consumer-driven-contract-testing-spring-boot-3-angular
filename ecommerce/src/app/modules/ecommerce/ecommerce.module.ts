import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { EcommerceRoutingModule } from './ecommerce-routing.module';

@NgModule({
  declarations: [ProductFormComponent, ProductListComponent],
  imports: [CommonModule, EcommerceRoutingModule, FormsModule],
})
export class EcommerceModule {}
