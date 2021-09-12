import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CategoryComponent } from './category/category.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CategoryComponent,
    NavBarComponent,
    UserComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    ShippingComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
