import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'form',
        component: ProductFormComponent,
      },
      {
        path: 'form/:id',
        component: ProductFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceRoutingModule { }
