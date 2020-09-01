import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addForm:FormGroup;

  constructor(private apiResponse:ApiService,private route:Router) { }

  ngOnInit() {
    window.localStorage.removeItem("editUserId");
    this.addForm =new FormGroup({
      'useremail':new FormControl(null, [Validators.required,Validators.email]),
      'password':new FormControl(null,[Validators.required,Validators.minLength(8)]),
      'firstName':new FormControl(null, Validators.required),
      'lastName':new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    const userdata={
      userEmail:this.addForm.controls.useremail.value,
      userPassword:this.addForm.controls.password.value,
      userFirstName:this.addForm.controls.firstName.value,
      userLastName:this.addForm.controls.lastName.value
    }
    this.apiResponse.createUser(userdata).subscribe(response =>{
      if(response != null){
        this.route.navigate(['list-user']);
      }      
    })
  }
}
