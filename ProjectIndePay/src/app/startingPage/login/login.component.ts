import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationData } from 'src/app/shared/authentication-data.model';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoading = false;

  //@ViewChild('loginForm', {static: false}) loginForm: NgForm;
  // attribute for the spinner
  //isLoading = flase;

  constructor(public authenticationService: AuthenticationService ) {}
  user: AuthenticationData;



  //method is executed when LoginButton pressed and thus loginForm is submitted
  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {     //check if form is valid
      return;
    }
    else {     // else pass loginName and password to authentication service
      this.authenticationService
      .login( loginForm.value.loginName,
              loginForm.value.password);
      this.isLoading = true;
    }
    loginForm.reset();
  }


  ngOnInit() {

  }
}
