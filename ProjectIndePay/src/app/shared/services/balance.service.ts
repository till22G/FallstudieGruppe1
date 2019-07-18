import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BalanceData } from 'src/app/shared/models/balance-data.model';
import { NotifierService } from 'angular-notifier';


@Injectable({ providedIn: 'root'})
export class BalanceService {

  private currentBalanceListener = new Subject<BalanceData>();

  private currentBalanceData = new BalanceData(0, '', 0);

  constructor(private http: HttpClient,
              private notifier: NotifierService) {}

  // fetechs the current balance form the backend so it can be accessed
  // from all components which need to display the currenBalanceData
   getCurrentBalance() {
     console.log('getCurrentBalance called');
     this.http.get<{balance: number}>('http://localhost:3000/api/v1/users/balance')
     .subscribe(response => {
       const currentBalance = response.balance;
       // const currency = response.currency;
       // this.currentBalanceData.setCurrency(currency); => implement getCurrency()
       console.log(response.balance);
       this.currentBalanceData.setBalance(currentBalance);
       console.log('current balance: ' + this.currentBalanceData.getBalance());
       this.updateBalanceData(this.currentBalanceData);
      }, error => {
        // implement errot case here
        this.notifier.notify('error', error.message);
      });
    }

  // if the currentBalanceData has to be updated througth another component or service,
  // the new Data will be submitted to all interested listeners
  // this is just for development and due to long waiting times for database answers
  // inital balance is passed along with the login in authentication.service
  // authentication.service updates this data so there is only one request
  // => for concistancy data is supposed to only be feteched from the database
  // where the current value is saved
  updateBalanceData(currentBalanceData: BalanceData) {
    this.currentBalanceData = currentBalanceData;
    this.currentBalanceListener.next(currentBalanceData);
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
