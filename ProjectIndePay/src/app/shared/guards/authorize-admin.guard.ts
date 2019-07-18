import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthorizeAdminGuard implements CanActivate {

  // use AuthenticationService and Router on constructor to make use of them on canActivate possible
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  // checks if user is authenticated to decide if he can be send along the selected route or
  // if he has to be rerouted when not authenticated
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const role = this.authenticationService.getRole();
    if (role !== 3) {
      this.router.navigate(['/home']);
    }
    else {
       return true;
    }
  }
}
