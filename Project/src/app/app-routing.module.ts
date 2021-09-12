import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path:'',component:HomeComponent},
  {path:'User',component:UserComponent},
  {path:'Product',component:ProductComponent},
  {path:'Cart',component:CartComponent},
  {path:'Shipping',component:ShippingComponent},

  {path:'Confirmation',component:ConfirmationComponent},

  {path:'**',redirectTo:'/' ,pathMatch:'full'}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
