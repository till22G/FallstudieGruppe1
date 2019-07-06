import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from 'src/app/startingPage/authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler ) {
    const token = this.authenticationService.getToken();
    if (token) {
      console.log('token not null');
      request = request.clone({
        setHeaders: {
          'Content-Type': 'appplication/json',
          Authentication : 'Bearer ' + token
        }
      });
    }
    return next.handle(request);
  }
}
