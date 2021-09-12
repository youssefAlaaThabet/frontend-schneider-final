import { Product } from './../../Models/Product.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from '../shared/interaction.service';
import { HttpService } from 'src/services/httpService.service';
import { Cart } from 'src/Models/Cart.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userSub= new Subscription();
  total=0;
  carts:Cart[]|null=[];
  product :Product[]=[];
  constructor(private httpService:HttpService,private interactionService:InteractionService) { }

 
  ngOnInit(): void {
  this.userSub=this.interactionService.ProductSoucrce.subscribe((items => {
    this.product=items

  }));

  this.httpService.getCart('/api/Carts').subscribe(getcart => {
    this.carts=getcart.body

    if(getcart.body!==null){
      for(var i=0;i<getcart.body.length;i++){
        const element = getcart.body[i];
        if(element.number !== undefined){
        this.total+= element.number;
        }
      }   

    }
  }, err => {
    alert(err.error.error);
  })

  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    
  }

}
