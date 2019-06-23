import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationData } from '../shared/authentication-data';

@Injectable({ providedIn: 'root'})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginName: string, password: string) {
    // create const with the data passed to the login method of the service
    const authenticationData: AuthenticationData ={loginName: loginName, password: password};
    // pass authenticationData to http and post it + subsribe for response
    this.http.post("", authenticationData)
      .subscribe(response => {
        console.log("auth worked");
        //implement what schoul happen
      });
  }


  //implement registration method here
}
