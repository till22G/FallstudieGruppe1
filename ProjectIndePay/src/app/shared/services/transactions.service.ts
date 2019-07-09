import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private ongoingTransactionListener = new Subject<TransactionData>();
  private transactions: Array<TransactionData> = [];
  private ongoingTransactionData: TransactionData;


    constructor(private http: HttpClient, private router: Router) {}
    // implement getTransactions here
    getTransactions() {
      this.http.get('')
        .subscribe(response => {

        });
    }

    forwardToCheckTransaction(transactionData: TransactionData) {
      this.ongoingTransactionData = transactionData;
      this.http.get<{fee: number}>('')
        .subscribe(response => {
          this.ongoingTransactionData.setFee(response.fee); // get curren fee in % for frontend calculation of fee
        }, error => {
          // implement error case
        });
      this.ongoingTransactionListener.next(transactionData);
      this.router.navigate(['/checkTransaction']);
    }

    getOngoingTransactionData() {
      return this.ongoingTransactionData;
    }

    placeTransaction() {
      this.http.post<{message: string}>('', this.ongoingTransactionData)
        .subscribe(response => {
          // ...response message
          this.ongoingTransactionData = null;
          // rerout to home here
        }, error => {
          // implement error cases here
        });
    }

    getOngoingTransactionListener() {
      return this.ongoingTransactionListener.asObservable();
    }
}
