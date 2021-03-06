import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationData } from 'src/app/shared/models/authentication-data.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginUserIsLoadingLsitenerSub = new Subscription();

  user: AuthenticationData;
  isLoading = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginUserIsLoadingLsitenerSub = this.authenticationService.getLoginUserIsLoading()
      .subscribe(response => {
        this.isLoading = response;
      });
  }

  // method is executed when LoginButton pressed and thus loginForm is submitted
  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {     // check if form is valid
      return;
    } else {     // else pass loginName and password to authentication service
      this.authenticationService
        .login(loginForm.value.loginName,
          loginForm.value.password);
      this.isLoading = true;
    }
    loginForm.reset();
  }

  ngOnDestroy() {
    this.loginUserIsLoadingLsitenerSub.unsubscribe();
  }
}
