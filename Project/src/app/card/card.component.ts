import { InteractionService } from './../shared/interaction.service';
import { Product } from './../../Models/Product.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/services/httpService.service';
import { Cart } from 'src/Models/Cart.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit , OnDestroy {

  
Category="All";
products:Product[]|null=[];
carts:Cart[]|null=[];

  constructor(private httpService:HttpService,private interactionService:InteractionService) { }
 

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
   this.userSub= this.interactionService.categorySoucrce.subscribe((items =>{
     this.Category=items
   }));
   this.httpService.getCart('/api/Carts').subscribe(res => {
    this.carts=res.body
  }, err => {
    alert(err.error.error);
  })

  }

    add(item: Product){
           this.httpService.putCart('/api/Carts',{number: item.number! + 1, productId: item.id, userId: 1, id: 0}).subscribe(res => {
            const product =  this.products?.find(x => x.id === res.body?.productId) as Product
            product.number = res.body?.number;
            location.reload();

          }, err => {
            alert(err.error.error);
          })
       }
    subtract(item:Product){
             this.httpService.putCart('/api/Carts',{number: item.number! - 1, productId: item.id, userId: 1, id: 0}).subscribe(res => {
              const product =  this.products?.find(x => x.id === res.body?.productId) as Product
              product.number = res.body?.number;
              location.reload();

            }, err => {
              alert(err.error.error);
            })
      }

    submit(id:any){ 

      const cartbeg:Cart = {id:0,number:1,productId:id,userId:1};

      this.httpService.postCart('/api/Carts',cartbeg).subscribe(res => {
        const product =  this.products?.find(x => x.id === res.body?.productId) as Product
        product.number = res.body?.number;
        location.reload();

      }, err => {
        alert(err.error.error);
      })
    }


    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }  
  }