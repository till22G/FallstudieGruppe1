import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationData } from '../shared/authentication-data';
import { RegisterUser } from '../shared/register-user.model';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient) {}


  login(loginName: string, password: string) {
    // create const with the data passed to the login method of the service
    const authenticationData: AuthenticationData = {loginName: loginName, password: password};
    // pass authenticationData to http and post it + subsribe for response
    this.http.post<{token: string}>('http://localhost:3000/control/users/read', authenticationData)
    .subscribe(response => {
      console.log('auth worked');
      console.log(response);
      // get token from response
      const token = response.token;
      this.token = token;
      // implement what schoul happen
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
    this.http.post('', RegisterUser).subscribe(response => {
        console.log('registration worked');
        console.log(response);
      });
    }

    getToken() {
      return this.token;
    }
  }
