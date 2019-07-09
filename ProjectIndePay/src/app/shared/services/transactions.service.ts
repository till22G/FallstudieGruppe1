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
  ongoingTransactionData: TransactionData = null;


    constructor(private http: HttpClient, private router: Router) {}
    // implement getTransactions here
    getTransactions() {
      this.http.get('')
        .subscribe(response => {

        });
    }

    forwardToCheckTransaction(transactionData: TransactionData) {
      this.ongoingTransactionData = transactionData;
      console.log('this amount is: ' + this.ongoingTransactionData.getAmount());
      this.http.post<{fee: number}>('http://localhost:3000/api/v1/transactions/fee', this.ongoingTransactionData.getAmount())
        .subscribe(response => {
          this.ongoingTransactionData.setFee(response.fee); // get curren fee in % for frontend calculation of fee
          console.log(response);
          this.ongoingTransactionListener.next(this.ongoingTransactionData);
          this.router.navigate(['/checkTransaction']);
        }, error => {
          // implement error case
        });
    }

    setOngoingTransactionData(transactionData: TransactionData) {
      this.ongoingTransactionData = transactionData;
    }

    getOngoingTransactionData() {
      return this.ongoingTransactionData;
    }

    createTransaction() {
      this.ongoingTransactionData = new TransactionData(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
      console.log('empty transaction created');
    }

    clearOngoingTransaction() {
      this.ongoingTransactionData = null;
    }

    setOngoingTransactionDataReceiver(receiver: string) {
      console.log(' setOngoingTransactionDataReceiver called with:' + receiver );
      this.ongoingTransactionData.setReceiver(receiver);
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
