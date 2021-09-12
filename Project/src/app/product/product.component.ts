import { Product } from './../../Models/Product.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/Models/User.model';
import { HttpService } from 'src/services/httpService.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  students:Product[]|null=[];
  x:any;
  message:String="";
  userFormGroup: FormGroup;

  constructor(private httpService:HttpService,private formBuilder:FormBuilder) { 
    this.userFormGroup=this.formBuilder.group({
      'name':[null,Validators.required],
      'price':[null,Validators.required],
      'category':[null,Validators.required],
      'image':[null,Validators.required]

    })
  }

  ngOnInit(): void {
  }
  
  onSubmit(){

    this.httpService.postProduct('/api/Products',this.userFormGroup.value).subscribe(res=>{
      this.x=res.body
      this.userFormGroup.reset();
    this.message="Product Was Added Successfully ✅";
    setInterval(function(){ location.reload()},3000);
    }, err => {
      alert(err.error.error);
    })
    
    }

}
