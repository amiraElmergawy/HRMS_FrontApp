import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  flashMessageClass = 'alert alert-light w-50 mt-5 center'
  baseURL = 'http://localhost:3000/'


  constructor(private flashMessage: FlashMessagesService, private http: HttpClient, private router: Router) { }

  postReq(url, obj = null) {
    return this.http.post(url, obj)
  }

  getReq(url) {
    return this.http.get(url)
  }

  patchReq(url, obj) {
    return this.http.patch(url, obj)
  }

  deleteReq(url) {
    return this.http.delete(url)
  }

  create(apiURL, obj): Observable<any> {
    return this.postReq(this.baseURL + apiURL, obj)
  }

  search(apiURL, obj): Observable<any> {
    return this.postReq(this.baseURL + apiURL, obj)
  }

  show(apiURL): Observable<any> {
    return this.getReq(this.baseURL + apiURL)
  }

  update(apiURL, obj): Observable<any> {
    return this.patchReq(this.baseURL + apiURL, obj)
  }

  delete(apiURL): Observable<any> {
    return this.deleteReq(this.baseURL + apiURL)
  }

  // to handle errors
  handleError(error: HttpErrorResponse, message?) {
    // console.log(this.router.url)
    if (this.router.url == '/logIn') {
      this.flashMessageClass = 'alert alert-light w-50 mt-5 center'
    } else {
      this.flashMessageClass = 'alert alert-danger w-50 mt-5 center'
    }
    if (message) {
      this.flashMessage.show(message, { cssClass: this.flashMessageClass, timeout: 3000 })
    } else {
      //let errorMessage = 'Unknown error!';
      if (error.status == 404) {
        // console.log(error.error.message)
        const errorMessage = typeof error.error.message != "string" ? 'لا توجد بيانات' : error.error.message
        this.flashMessage.show(errorMessage, { cssClass: this.flashMessageClass, timeout: 3000 })
        // this.flashMessage?.grayOut(true);
        // this.router.navigate(['no-longer-available']);// to force user navigate back to home
      }
      else if (error.status == 500) {
        const errorMessage = typeof error.error.message != "string" ? 'حدث خطأ بالخادم الداخلي' : error.error.message
        this.flashMessage.show(errorMessage, { cssClass: this.flashMessageClass, timeout: 3000 })
        // this.storage.clear();
        // this.router.navigate(['/login/']);
        // console.clear();
        // this.router.navigate(['something-went-wrong']);// to force user navigate back to home
      }
      else if (error.status == 405) {
        this.flashMessage.show(error.error.message, { cssClass: this.flashMessageClass, timeout: 3000 })
        // this.storage.clear();
        // this.router.navigate(['/login/']);
        // console.clear();
        // this.router.navigate(['something-went-wrong']);// to force user navigate back to home
      }
      else if (error.status == 401) {
        // this.storage.clear();
        // this.router.navigate(['/login/']);
        this.flashMessage.show('غير مصرح القيام بهذه العمليه', { cssClass: `${this.flashMessageClass} alert-danger`, timeout: 3000 });
      }
      // else {
      //   //console.log(error);
      //   if (error.error.errors) {
      //     // var jsonError: string = JSON.stringify(error.error.errors);
      //     // this.flashMessage.show(jsonError, { cssClass: 'flash_danger', timeout: 5000 });
      //   } else {
      //     // this.flashMessage.show(error.error.error, { cssClass: 'flash_danger', timeout: 5000 });
      //   }
      // }
    }
  }

  checkLoadFlag() {
    // const itemValue = new BehaviorSubject(localStorage.getItem('loadingFlag'))
    // return  itemValue
    return localStorage.getItem('loadingFlag')
  }

  handleSuccess(message?: string) {
    this.flashMessageClass = 'alert alert-secondary w-50 mt-5 center'
    if (message)
      this.flashMessage.show(message, { cssClass: this.flashMessageClass, timeout: 3000 })
    else
      this.flashMessage.show('تمت العملية بنجاح', { cssClass: this.flashMessageClass, timeout: 3000 })
  }

}
