import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/startingPage/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class BalanceService {
  private currentBalance;
  private currentBalanceListener = new Subject<number>();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  // send with token
  // getCurrentBalance() {
  //   this.http.get('')
  //   .subscribe(response => {
  //     const currentBalance = response.balance;
  //     this.currentBalance = currentBalance;
  //     this.currentBalanceListener.next(this.currentBalance);
  //   });
  // }

  getInitialBalance() {
    const initialBalance = this.authenticationService.getInitialBalance();
    this.currentBalance = initialBalance;
    return initialBalance;
  }

  // get the current token from the authenticationService to attach it
  // to the get request (=> unique db key is encrypted in there + authentification)
  getCurrentToken() {
    return this.authenticationService.getToken();
  }

  getCurrentBalanceListener() {
    return this.currentBalanceListener.asObservable();
  }
}
