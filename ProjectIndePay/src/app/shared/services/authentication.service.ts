import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationData } from '../models/authentication-data.model';
import { RegisterUser } from '../models/register-user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BalanceService } from './balance.service';
import { BalanceData } from '../models/balance-data.model';
import { NotifierService } from 'angular-notifier';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {

  private authenticationStatusListener = new Subject<boolean>();
  private authenticationNameListener = new Subject<string>();
  private registerUserIsLoadingListener = new Subject<boolean>();
  private loginUserIsLoadingListener = new Subject<boolean>();

  private token: string;
  private tokenTimer: NodeJS.Timer;

  private userLoginName: string;
  private initialBalance: number;
  private role = 'admin';
  private isAuthenticated = false;

  constructor(  private http: HttpClient,
                private router: Router,
                private balanceService: BalanceService,
                private notofier: NotifierService) {}



  login(loginName: string, password: string) {
    this.loginUserIsLoadingListener.next(true);
    console.log('login called');
    // create const with the data passed to the login method of the service
    const authenticationData: AuthenticationData = new AuthenticationData (loginName, password);
    // pass authenticationData to http and post it + subsribe for response

    this.http.post<{jwt: string, firstName: string, expiresIn: number, balance: number, currency: string, role: string}>
    ('http://localhost:3000/api/v1/users/read', authenticationData)
    .subscribe(response => {
      console.log('auth worked');
      console.log(response);

      // get token from response, store it in private token attribute and set up observable
      const token = response.jwt;
      this.token = token;
      console.log(this.token);

      this.role = response.role;

      const balanceData = new BalanceData(response.balance, response.currency, 0); // => check model and get the currency from backend
      this.balanceService.updateBalanceData(balanceData);
      console.log('auth: updateBalanceCalled');

      // check if a token was returned
      if (token) {
        // set isAuthenticated to true so other components can get this information from the authentication servive
        // and check if the user is authenticated
        this.isAuthenticated = true;

        // forward true via the authenticationStatusListener so subscribers so they
        // get the update that the authentication status was changed to true
        this.authenticationStatusListener.next(true);

        // get userName from response, store it in private userLoginName and set up observable
        const userLoginName = response.firstName;
        this.userLoginName = userLoginName;
        this.authenticationNameListener.next(this.userLoginName);

        // get the time when the token will expire after it was created
        // so we can call logout after this time
        const expiresInDuration = response.expiresIn;
        // save the timeout in variable so it can be cleared when logout is called manully by the user
        this.tokenTimer = setTimeout(() => {
          this.logout(); // call logout after timer expires
        }, expiresInDuration * 1000); // * 1000 => because setTimer works with milliseconds and we get seconds from the backend

        // get the initial balance so the balance servive can get it for the home-page after rerouting
        const initialBalance = response.balance;
        this.initialBalance = initialBalance;


        // give the local Storage the curent date + the expiration time so we can implements an auto login while token is valid
        // const now = new Date();
        // const expirationDate = new Date(now.getTime() + (expiresInDuration * 1000));
        // this.saveAuthenticationData(token , expirationDate); ---------------------------> for auto login
        // call router an navigate to the home page
        this.loginUserIsLoadingListener.next(false);
        this.router.navigate(['/home']);
        this.notofier.notify('success', 'login successfull');
      }
    }, error => {
      // implement error case here
      this.notofier.notify('error', error.message);
    });
  }



  // implement registration method here
  register(firstName: string, lastName: string, loginName: string, password: string, repeatPassword: string) {

    this.registerUserIsLoadingListener.next(true);
    // create const as RegisterUser to pass along in http.post
    const registerUser: RegisterUser = new RegisterUser (
      firstName,
      lastName,
      loginName,
      password,
      repeatPassword);

      // implement path for user registration
    this.http.post('http://localhost:3000/api/v1/users/create', registerUser)
      .subscribe(response => {
        console.log('registration worked');
        console.log(response);
        this.registerUserIsLoadingListener.next(false);
        this.notofier.notify('success', response.toString());
      }, error => {
        this.registerUserIsLoadingListener.next(false);
        this.notofier.notify('error', error);
        console.log('registraition failed');
      });
    }



    // takes care of the stepps to clear token and inform the application about the logout
    logout() {
      // set token to null to clear it
      this.token = null;
      // sets is Authenticated to false and changes role to null
      this.isAuthenticated = false;
      this.role = null;
      // inform subscribing roles that user is not longer authenticated
      this.authenticationStatusListener.next(false);
      // call rouer and navigate back to the info-page
      this.router.navigate(['/info']);

      // reset timer when user calls logout manullay
      clearTimeout(this.tokenTimer);
      // clear authenticationData in the localStorage of the browser wen manually logging out
      // this.clearAuthenticationData(); ---------------------------> for auto login
    }

    // save the token (and expiration date) in the local storage of the brwoser so a user is not logged
    // out after the angular app reloads. Since the token expires after 10 minutes the user will get logged out after
    // this time if the user forgets to log out mannually
    // private saveAuthenticationData(token: string, expirationDate: Date) {
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('expiration', expirationDate.toISOString());
    // } ---------------------------> for auto login

    // clear authentication data in local storage => this is going to be called on logout
    // private clearAuthenticationData() {
    //   localStorage.removeItem('token');
    //   localStorage.removeTtem('expiration');
    // } ---------------------------> for auto login

    // getAuthenticationDate() {
    //   const token = localStorage.getItem('token');
    //   const expirationDate = localStorage.getItem('expiration');
    //   if (!token && !expirationDate){
    //     return;
    //   }
    //   else {
    //     token: token;
    //     expirationDate: new Date(expirationDate);
    //   }
    // }---------------------------> for auto login => still under construction => implement only if other functions work


    getToken() {
      return this.token;
    }

    getIsAuthenticated() {
      return this.isAuthenticated;
    }

    getInitialBalance() {
      return this.initialBalance;
    }

    getRole() {
      return this.role;
    }

    // get the observalbes in this block
    // ---------------------------------
    getLoginUserIsLoading() {
      return this.loginUserIsLoadingListener.asObservable();
    }

    getAuthenticationStatusListener() {
      return this.authenticationStatusListener.asObservable();
    }

    getAuthenticationNameListener() {
      return this.authenticationNameListener.asObservable();
    }

    getRegisterUserIsLoadingListener() {
      return this.registerUserIsLoadingListener.asObservable();
    }
    // ---------------------------------
  }
