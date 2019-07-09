import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BalanceData } from 'src/app/shared/models/balance-data.model';

@Injectable({ providedIn: 'root'})
export class BalanceService {
  private currentBalanceData = new BalanceData(0, '', 0);
  private currentBalanceListener = new Subject<BalanceData>();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

   getCurrentBalance() {
     console.log('getCurrentBalance called');
     this.http.post<{balance: number}>('http://localhost:3000/api/v1/users/balance', {num: 0})
     .subscribe(response => {
       const currentBalance = response.balance;
       // const currency = response.currency;
       // this.currentBalanceData.setCurrency(currency); => implement getCurrency()
       console.log(response.balance);
       this.currentBalanceData.setBalance(currentBalance);
       this.currentBalanceListener.next(this.currentBalanceData);
       console.log('current balance: ' + this.currentBalanceData.getBalance());
     });
   }

  getCurrentBalanceListener() {
    return this.currentBalanceListener.asObservable();
  }
}
