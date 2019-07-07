import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private ongoingTransactionListener = new Subject<TransactionData>();
  private transactions: Array<TransactionData> = [];
  private ongoingTransactionData: TransactionData;


    constructor(private http: HttpClient) {}
    // implement getTransactions here
    getTransactions() {
      this.http.get('')
        .subscribe(response => {

        });
    }

    forwardToCheckTransaction(transactionData: TransactionData) {
      this.ongoingTransactionData = transactionData;
      this.ongoingTransactionListener.next(transactionData);
    }

    getOngoingTransactionData() {
      return this.ongoingTransactionData;
    }

    placeTransaction() {

    }

    getOngoingTransactionListener() {
      return this.ongoingTransactionListener.asObservable();
    }
}
