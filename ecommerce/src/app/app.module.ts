import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { interceptorProviders } from '@core/interceptors/interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcommerceModule } from './modules/ecommerce/ecommerce.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EcommerceModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
