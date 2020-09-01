import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: any;
  editForm: FormGroup;
 
  constructor(private route: Router, private apiService: ApiService) { }

  ngOnInit() {
    const userId = window.localStorage.getItem('editUserId');
    if(!userId){
      alert('Invalid action');
      this.route.navigate(['list-user']);
      return;
    }
    this.editForm = new FormGroup({
      'useremail' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'firstName' : new FormControl(null, Validators.required),
      'lastName' : new FormControl(null, Validators.required),
      'userid' : new FormControl(null, Validators.required)
    });
    this.apiService.getUserById(userId).subscribe(response =>{
      this.editForm.patchValue({
        userid:response.userId,
        firstName:response.userFirstName,
        lastName:response.userLastName,
        password:response.userPassword,
        useremail:response.userEmail,
      })
    })
  }
  onSubmit(){
    console.log('submitting edit forms to api service ');
    if(this.editForm.invalid){
      console.log('invalid form data')
      return;
    }
    const editUserData={
      'userEmail' : this.editForm.controls.useremail.value,
      'userPassword' : this.editForm.controls.password.value,
      'userFirstName' : this.editForm.controls.firstName.value,
      'userLastName' : this.editForm.controls.lastName.value,
      'userId' : this.editForm.controls.userid.value,
    }
    console.log(editUserData);
    this.apiService.updateUser(editUserData).subscribe( response => {
      console.log(response);
    });
  }
}
