import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private apiService:ApiService, private route:Router) { }

  onSubmit(){
    if(this.loginForm.invalid){
      console.log('invalid form ')
      return;
    }
    const loginData={
      username:this.loginForm.controls.username.value,
      password:this.loginForm.controls.password.value
    }
    this.apiService.login(loginData).subscribe(response =>{
      if(response.user !== null){
        window.localStorage.setItem("token", response.token);
        console.log(response);
        this.route.navigate(['list-user']);
      }else{
        this.invalidLogin = true;
        console.log(response);
      }
    });
  }

  ngOnInit() {
   window.localStorage.removeItem('token');
   window.localStorage.removeItem("editUserId");
   this.loginForm =new FormGroup({
    'username':new FormControl(null, Validators.required),
    'password':new FormControl(null,Validators.required)
  });
  }

}
