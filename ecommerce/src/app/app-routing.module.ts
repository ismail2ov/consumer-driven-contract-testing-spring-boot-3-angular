import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'product/list', pathMatch: 'full'},
  {
    path: 'product',
    loadChildren: () =>
      import('./modules/ecommerce/ecommerce.module').then(
        (m) => m.EcommerceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
