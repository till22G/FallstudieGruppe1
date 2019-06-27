import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationData } from '../shared/authentication-data';
import { RegisterUser } from '../shared/register-user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  private token: string;
  private userLoginName: string;
  private authenticationStatusListener = new Subject<boolean>();
  private authenticationNameListener = new Subject<string>();
  private isAuthenticated = false;


  constructor(private http: HttpClient, private router: Router) {}



  login(loginName: string, password: string) {
    // create const with the data passed to the login method of the service
    const authenticationData: AuthenticationData = {loginName: loginName, password: password};
    // pass authenticationData to http and post it + subsribe for response

    this.http.post<{jwt: string, firstName: string}>('http://localhost:3000/control/users/read', authenticationData)
    .subscribe(response => {
      console.log('auth worked');
      console.log(response);

      // get token from response, store it in private token attribute and set up observable
      const token = response.jwt;
      this.token = token;
      console.log(this.token);

      //check if a token was returned
      if(token) {
        // set is authenticated to true
        this.isAuthenticated = true;

        // set the authenticationStatus to true
        this.authenticationStatusListener.next(true);

        // get userName from response, store it in private userLoginName and set up observable
        const userLoginName = response.firstName;
        this.userLoginName = userLoginName;
        this.authenticationNameListener.next(this.userLoginName);

        // call router an navigate to the home page
        this.router.navigate(['/home']);
      }
    });
  }



  // implement registration method here
  register(firstName: string, lastName: string, loginName: string, password: string, repeatPassword: string) {

    // create const as RegisterUser to pass along in http.post
    const registerUser: RegisterUser = {
      firstName      : firstName,
      lastName       : lastName,
      loginName      : loginName,
      password       : password,
      repeatPassword : repeatPassword};

      // implement path for user registration
    this.http.post('http://localhost:3000/control/users/create', registerUser).subscribe(response => {
        console.log('registration worked');
        console.log(response);
      });
    }



    // takes care of the stepps to clear token and inform the application about the logout
    logout() {
      // set token to null to clear it
      this.token = null;
      // sets is Authenticated to false
      this.isAuthenticated = false;
      // inform subscribing roles that user is not longer authenticated
      this.authenticationStatusListener.next(false);
      // call rouer and navigate back to the info-page
      this.router.navigate(['/info']);
    }



    getToken() {
      return this.token;
    }

    getAuthenticationStatusListener() {
      return this.authenticationStatusListener.asObservable();
    }

    getAuthenticationNameListener() {
      return this.authenticationNameListener.asObservable();
    }

    getIsAuthenticated() {
      return this.isAuthenticated;
    }
  }
