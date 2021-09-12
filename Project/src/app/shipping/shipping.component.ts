import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cart } from 'src/Models/Cart.model';
import { Product } from 'src/Models/Product.model';
import { HttpService } from 'src/services/httpService.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  x:any;
  userFormGroup: FormGroup;
  products:Product[]|null=[];
  carts:Cart[]|null=[];
  Total:number=0;
  count:number=0;

  
  constructor(private httpService:HttpService,private formBuilder:FormBuilder) { 
    this.userFormGroup=this.formBuilder.group({
      'address':[null,Validators.required],

    })
  }
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


   this.httpService.getCart('/api/Carts').subscribe(getcart => {
     this.carts=getcart.body
 
     if(getcart.body!==null){
       for(var i=0;i<getcart.body.length;i++){
         const element = getcart.body[i];
         if(element.number !== undefined){
         this.count+= element.number;
         }
       }   
 
     }
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

  onSubmit(){

     this.httpService.postShipping('/api/Shipping',this.userFormGroup.value).subscribe(res=>{
       this.x=res.body
      })


    if(this.carts!==null){

    for (let i = 0; i < this.carts.length; i++) {
      const element = this.carts[i].id;
      this.httpService.deletecart('/api/Carts/',element).subscribe(res=>{
        this.x=res.body
        location.href = "http://localhost:4200/Confirmation";

      }, err => {
        alert(err.error.error);
      })
    }
  }
     

    }
    

}
