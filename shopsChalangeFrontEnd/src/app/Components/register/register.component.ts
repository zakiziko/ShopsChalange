import { Component, OnInit } from '@angular/core';
import {ValidationService} from '../../Services/validation.service';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : boolean|String;
  password : String;
  constructor(
    private VService : ValidationService,
    private userService : UserService,
    private _route : Router,
    private flashMessage :FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      email : this.email,
      password : this.password,
      preferedShops : []
    }
    //test form validation
    if(this.VService.validateRegister(user)){
      //test email validation
      if(this.VService.validatEmail(user.email)){
        this.userService.singUp(user).subscribe((data)=>{
          //test email existence in database with resulte coming from backend
          if(data.ok){
           this._route.navigate(['/login'])
          }
        },error =>{
          this.flashMessage.show('email already Used !!!', {
            classes: ['alert', 'alert-info']
          });
         
        })
      }else{
        this.flashMessage.show('Use a Validate Email Please !!!', {
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
