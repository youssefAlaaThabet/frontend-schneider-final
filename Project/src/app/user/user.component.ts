import { User } from './../../Models/User.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/services/httpService.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  x:any;
  message:String="";
  userFormGroup: FormGroup;

  ngOnInit(): void {
  }

  
  constructor(private httpService:HttpService,private formBuilder:FormBuilder) { 
    this.userFormGroup=this.formBuilder.group({
      'name':[null,Validators.required],
      'address':[null,Validators.required],
      'email':[null,[Validators.required,Validators.email]],
      'phone':[null,Validators.required],
      'gender':[null,Validators.required]

    })
  }




  onSubmit(){
    this.httpService.postProduct('/api/User',this.userFormGroup.value).subscribe(res=>{
      this.x=res.body
      this.userFormGroup.reset();
    this.message="User Signed in Successfully ✅";
    setInterval(function(){ location.reload()},3000);
    }, err => {
      alert(err.error.error);
    })

    

    
    }
    

  
  

}
