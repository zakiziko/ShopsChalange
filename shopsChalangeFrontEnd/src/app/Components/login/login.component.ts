import { Component, OnInit } from '@angular/core';
import {ValidationService} from '../../Services/validation.service';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email :String;
  password : String;
  constructor(
    private VService : ValidationService,
    private userService : UserService,
    private _route : Router,
    private flashMessage :FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onsingInSubmit(){
    const user = {
      email : this.email,
      password : this.password
    }

    //test input contents
    if(this.VService.validateRegister(user)){
      //test email validation and api body response 
      if(this.VService.validatEmail(user.email)){
        this.userService.singIn(user).subscribe(data=>{
          if(data._body==""){
            this.flashMessage.show('Email or Password Incorrect !!!', {
              classes: ['alert', 'alert-warning'] // You can pass as many classes as you need
            });
          }else{
            sessionStorage.setItem('user',JSON.stringify(data));
            this._route.navigate(['/'])
          }
        })
        
      }else{
        this.flashMessage.show('Wrong Email !!!', {
          classes: ['alert', 'alert-danger']
        });
      }
    }else{
      this.flashMessage.show('fill All Fields !!!', {
        classes: ['alert', 'alert-danger']
      });
    }

  }
}
