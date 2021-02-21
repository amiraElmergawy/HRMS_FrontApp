import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // for security reasons add token to only requests that need auth.
    // console.log(request.url)
    if (request.url.includes('delete') || request.url.includes('update') || (request.url.includes('admins') && !request.url.includes('logIn')) || request.url.includes('remove')) {
      let token = localStorage.getItem('token') // return null if it is not exist
      // console.log(token)
      if (token) {
        token = "Bearer " + token
        request = request.clone({
          headers: request.headers.set('Authorization', token)
        })
        // console.log(request.headers)
      }
    }
    return next.handle(request);
  }
}
