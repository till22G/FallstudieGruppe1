import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BalanceData } from 'src/app/shared/models/balance-data.model';

@Injectable({ providedIn: 'root'})
export class BalanceService {
  private currentBalanceData: BalanceData;
  private currentBalanceListener = new Subject<BalanceData>();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

   getCurrentBalance() {
    this.currentBalanceData = new BalanceData(100, 'USh', 2);

    this.currentBalanceListener.next(this.currentBalanceData);

  //   this.http.get('')
  //   .subscribe(response => {
  //     const currentBalance = response.balance;
  //     this.currentBalance = currentBalance;
  //     this.currentBalanceListener.next(this.currentBalance);
  //   });
   }

  getCurrentBalanceListener() {
    return this.currentBalanceListener.asObservable();
  }
}
