import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collection : any;
  constructor(
    private userService : UserService,
    private _route : Router,
    private flashMessage :FlashMessagesService) { }

    //fill the collection with Updated shops data
  ngOnInit() {
    this.userService.mainShoplist().subscribe(data=>{
     this.collection = data;
     if(sessionStorage.getItem('disliked')){
      this.dislikedTimeOut();
     }
    })
  }

  /*
  keep shops in dislikedList only if there outTime is grater then Now 
  and let others being displayed on the main nearby shops
  */
  dislikedTimeOut(){
    //declaration
    var disliked=[];
    var date = new Date();
    var now = date.getHours();
    disliked = JSON.parse(sessionStorage.getItem('disliked'));
   //free shops from disliked list in sessionStorage
    for(var i=0;i<disliked.length;i++){
      disliked = disliked.filter(item=>item.time>now);
    }
    sessionStorage.setItem('disliked',JSON.stringify(disliked));
    //Update shops Collection with shops backing from disliked list 
    for(var i=0;i<disliked.length;i++){
      this.collection = this.collection.filter(item=>item.id!=disliked[i].id);
     }
  }

  //update user preferred list 
  OnLike(e){
    var user = JSON.parse(sessionStorage.getItem('user'));
    //test if user is signIn 
    if(user){
      user.preferedShops.push(e);
      this.userService.update(user).subscribe(data=>{
        sessionStorage.setItem('user',JSON.stringify(data));
        window.location.reload();
      });
    }else{
      this.flashMessage.show('YOU SHOULD SIGNIN FIRST',{
        classes: ['alert', 'alert-info']
      });
       this._route.navigate(['/login']);
    }
   
  }
  /*
  create an object with disliked Shop ID and time to get out of the dislikedShoplist
  and send it to service that will push it in a list stored in sessions
  */
  OnDesLike(e){
    //test if user signIn
    if(sessionStorage.getItem('user')){
      var now = new Date();
      var timeOut = now.getHours()+2;
      console.log(timeOut);
      const shopeDesliked = {
        id : e.id,
        time : timeOut
      }
      this.userService.dislike(shopeDesliked);
      window.location.reload();
    }else{
      this.flashMessage.show('YOU SHOULD SIGNIN FIRST',{
        classes: ['alert', 'alert-info']
      });
      this._route.navigate(['/login']);
    }
    
  }

}
