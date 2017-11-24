import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService : UserService, private _route : Router) { }

  ngOnInit() {
  }

  OnLogout(){
    sessionStorage.clear();
    this._route.navigate(['/']);
    window.location.reload();
  }
}
