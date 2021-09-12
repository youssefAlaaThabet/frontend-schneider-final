import { InteractionService } from './../shared/interaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  items = "";


  constructor( private interactionService:InteractionService) { }




  ngOnInit(): void {
  }
  All(){
    this.items="All";
    this.interactionService.sendCategory(this.items);

  }
  Bread(){
    this.items="Bread";
    this.interactionService.sendCategory(this.items);

  }
  DiaryProducts(){
    this.items="Diary Products";
    this.interactionService.sendCategory(this.items);


    
  }
  Vegetables(){
    this.items="Vegetables";
    this.interactionService.sendCategory(this.items);


    
  }
  Fruits(){
    this.items="Fruits";
    this.interactionService.sendCategory(this.items);

    
  }
  Technology(){
    this.items="Technology";
    this.interactionService.sendCategory(this.items);

    
  }
  Other(){
    this.items="Other";
    this.interactionService.sendCategory(this.items);

    
  }
  
  


}
