import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-preffered-shop',
  templateUrl: './preffered-shop.component.html',
  styleUrls: ['./preffered-shop.component.css']
})
export class PrefferedShopComponent implements OnInit {

  collection : any;
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.preferredShops().subscribe(data=>{
      this.collection = data;
    })
  }
  //remove shop from user preferredShops  
  OnRemove(e){
    var user = JSON.parse(sessionStorage.getItem('user'));
    this.collection = this.collection.filter(item=>item.id!=e.id);
    user.preferedShops = this.collection;
    //update user preferredShops
    this.userService.update(user).subscribe(data=>{
      sessionStorage.setItem('user',JSON.stringify(data));
      window.location.reload();
    });
  }

}
