import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from 'src/app/startingPage/authentication.service';

export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler ) {


    return next.handle(request);
  }

  private setAuthenticationHeader(request: HttpRequest<any>) {
    const token = this.authenticationService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'appplication/json',
          Authentication : 'Bearer ${token}'
        }
      });
    }
  }
}
