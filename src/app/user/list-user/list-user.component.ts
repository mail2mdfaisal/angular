import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { ApiService } from 'src/app/service/api.service';
import { TokenError } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users:any[];

  constructor(private router: Router,private apiService:ApiService) { }

  ngOnInit() {
    const token=window.localStorage.getItem('token');
    if(!token){
      console.log('going to login bcz no token')
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getUsers().subscribe(response =>{
      this.users=response;
      console.log(this.users)
    });    
  }
  deleteUser(user:any){
    this.users = this.users.filter(u => u !== user);
  }

  addUser(){
    this.router.navigate(['create-user'])
  }
  editUser(user:any){
    console.log(user);
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.userId.toString());
    this.router.navigate(['edit-user']);
  }

}
