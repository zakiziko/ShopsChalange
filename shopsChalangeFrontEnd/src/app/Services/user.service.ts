import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { jsonpFactory } from '@angular/http/src/http_module';

@Injectable()
export class UserService {
  user : any;
  dislikedList : any[];
  constructor(private _http : Http) { }

  singUp(user){
    let headers  = new Headers();
    headers.append('Content-type','application/json');
    return this._http.post('http://localhost:8080/user/signUp',user,{headers : headers});
  }

  singIn(user){
    let headers  = new Headers();
    headers.append('Content-type','application/json');
    return this._http.get('http://localhost:8080/user/signIn/'+user.email+'/'+user.password+'',{headers : headers})
    .map(res => res.text() ? res.json() : res)
  }

  //main shop list based on distance and userPreferred list IF he is logedIn
  mainShoplist(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    const u =JSON.parse(sessionStorage.getItem('user'));
    var latitude =0;
    var longitude =0;
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude =   position.coords.longitude;
    });
    //if user is loggedIN 
    if(u){
      return this._http.get('http://localhost:8080/user/NearbyShops/'+u.id+'/'+longitude+'/'+latitude+'/cords',{headers : headers})
      .map(res => res.text() ? res.json() : res)
    }else{
      //for any user before signIn
      return this._http.get('http://localhost:8080/user/NearbyShopsN/'+longitude+'/'+latitude+'/cords',{headers : headers})
      .map(res => res.text() ? res.json() : res)
    }
    
  }

  //update user preferredShops even if it's like or remove
  update(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this._http.put('http://localhost:8080/user/update',user,{headers : headers})
    .map(res => res.json())
  }

  //get user prefered shops
  preferredShops(){
    let headers =  new Headers();
    headers.append('Content-type','application/json');
    return this._http.get('http://localhost:8080/user/PreferredShops/'+this.user.id, {headers : headers})
    .map(res =>res.json())
  }

  //store the disliked shops inside sessionsStorage each item has a shopID and time to get out of list
  dislike(dislikedShope){
    var shope = [];
    if(sessionStorage.getItem('disliked')){
      shope = JSON.parse(sessionStorage.getItem('disliked'));
      shope.push(dislikedShope);
      this.dislikedList=shope;
      sessionStorage.setItem('disliked',JSON.stringify(this.dislikedList));
    }else{
      //first disliked
      shope.push(dislikedShope);
      sessionStorage.setItem('disliked',JSON.stringify(shope));
    }
  }
  //test if user in loogedIn to manage routes that should be displayed 
  IslogedIn(){
    if(sessionStorage.getItem('user')){
      this.user =JSON.parse(sessionStorage.getItem('user'));
      return true;
    }else{
      this.user = null;
      return false;
    }
  }
}
