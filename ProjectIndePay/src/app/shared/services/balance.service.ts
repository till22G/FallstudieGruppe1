import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BalanceData } from 'src/app/shared/models/balance-data.model';


@Injectable({ providedIn: 'root'})
export class BalanceService {
  private currentBalanceData = new BalanceData(0, '', 0);
  private currentBalanceListener = new Subject<BalanceData>();

  constructor(private http: HttpClient) {}

   getCurrentBalance() {
     console.log('getCurrentBalance called');
     this.http.post<{balance: number}>('http://localhost:3000/api/v1/users/balance', {num: 0})
     .subscribe(response => {
       const currentBalance = response.balance;
       // const currency = response.currency;
       // this.currentBalanceData.setCurrency(currency); => implement getCurrency()
       console.log(response.balance);
       this.currentBalanceData.setBalance(currentBalance);
       console.log('current balance: ' + this.currentBalanceData.getBalance());
       this.updateBalanceData(this.currentBalanceData);
      });
    }

  // if the currentBalanceData has to be updated througth another component or service,
  // the new Data will be submitted to all interested listeners
  updateBalanceData(currentBalanceData: BalanceData) {
    this.currentBalanceListener.next(currentBalanceData);
    this.currentBalanceData = currentBalanceData;
    console.log('uBD:' + currentBalanceData.getBalance());
  }

  // since services and components which need access to the current balance always listen to it,
  // an easy way to get the currentBalnceData is to send it again
  submitCurrentBalanceData() {
    this.currentBalanceListener.next(this.currentBalanceData);
  }

  getCurrentBalanceData() {
    return this.currentBalanceData;
  }

  // get the observalbes in this block
  // ---------------------------------
  getCurrentBalanceListener() {
    return this.currentBalanceListener.asObservable();
  }
   // ---------------------------------
}
