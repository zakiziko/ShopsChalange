import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  validateRegister(user){
    if(user.email == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }
  validatEmail(email){
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return filter.test(email);

  }

}
