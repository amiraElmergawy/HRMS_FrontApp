import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainService } from './main.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends MainService{

  baseURL = 'http://localhost:3000/admins'
  data;
  constructor( http:HttpClient, flashMessage:FlashMessagesService, router:Router) {
    super(flashMessage, http, router)
  }


  logIn(user):Observable<any>{
    return this.postReq(`${this.baseURL}/logIn`, user)
    // return this.http.post(`${this.baseURL}/logIn`, user)
  }

  logOut():Observable<any>{
    return this.postReq(`${this.baseURL}/logOut`)
    // return this.http.post(`${this.baseURL}/logOut`, null)
  }



}
