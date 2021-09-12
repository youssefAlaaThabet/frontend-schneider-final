import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/Models/Cart.model';
import { Product } from 'src/Models/Product.model';
import { HttpService } from 'src/services/httpService.service';
import { InteractionService } from '../shared/interaction.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products:Product[]|null=[];
  carts:Cart[]|null=[];
  Total:number=0;


  constructor(private httpService:HttpService) { }

  

userSub= new Subscription();
  ngOnInit(): void {
  
   this.httpService.getProducts('/api/Products').subscribe(getproduct => {
    this.products=getproduct.body
    this.httpService.getCart('/api/Carts').subscribe(getcart => {
      this.carts=getcart.body
      if(getproduct.body!== null && getcart.body!==null){
      for(var i=0;i<getcart.body.length;i++){
        const ex = getcart.body[i];
       const product =  getproduct.body.find(x => x.id === ex.productId) as Product 
       product.number = getcart.body[i].number;
      }
    }
  }, err => {
    alert(err.error.error);
  })
  }, err => {
    alert(err.error.error);
  })
}

TotalPrice(){
  this.Total=0;
  if(this.products!==null){
  for (var i in this.products) {
    const ex = this.products[i] as Product;
 
    if(ex.number !== undefined && ex.number>0){
      this.Total+= (ex.number * ex.price);
    }
    }
  }
  return this.Total;

  
}
Add(item: Product){
  this.httpService.putCart('/api/Carts',{number: item.number! + 1, productId: item.id, userId: 1, id: 0}).subscribe(res => {
   const product =  this.products?.find(x => x.id === res.body?.productId) as Product
   product.number = res.body?.number;
   location.reload()

 }, err => {
  alert(err.error.error);
})
}

Subtract(item:Product){
    this.httpService.putCart('/api/Carts',{number: item.number! - 1, productId: item.id, userId: 1, id: 0}).subscribe(res => {
     const product =  this.products?.find(x => x.id === res.body?.productId) as Product
     product.number = res.body?.number;
     location.reload()

    }, err => {
      alert(err.error.error);
     
   })
}


checkSum(){
  if(this.TotalPrice()!==undefined ){
    if(this.TotalPrice()>0){
    return true;
    }
  }
  return false;
}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
