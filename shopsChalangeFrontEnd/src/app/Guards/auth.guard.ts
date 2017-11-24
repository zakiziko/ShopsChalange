import { Injectable } from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {UserService} from '../Services/user.service';
/*
AuthGuard service will protecte our routes with canActivate function 
*/ 


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private userService : UserService,private _route : Router){}

    canActivate(){
        if(this.userService.IslogedIn()){
            return true;
        }else{
            this._route.navigate(['/login']);
            return false;
        }
    }
}