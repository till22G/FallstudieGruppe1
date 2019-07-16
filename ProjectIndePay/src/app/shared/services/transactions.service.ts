import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private ongoingTransactionListener = new Subject<TransactionData>();
  private lastTransactionsListener = new Subject<TransactionData[]>();
  private lastTransactions: TransactionData[] = [];
  ongoingTransactionData: TransactionData = null;


    constructor(private http: HttpClient, private router: Router) {}
    // implement getTransactions here
    getTransactions(transactionsPerPage: number, currentPage: number) {
      const queryParams = `?pagesize=${transactionsPerPage}&page=${currentPage}`;
      this.http.get<{message: string, transactionArray: [TransactionData]}>('')
        .subscribe(response => {
          this.lastTransactions = response.transactionArray;
        }, error => {
          // implement error case here
          console.log('error at fetching the last tranasactions');
        });
    }

    forwardToCheckTransaction(transactionData: TransactionData) {

      this.ongoingTransactionData = transactionData;
      const amount  = this.ongoingTransactionData.getAmount();
      console.log('this amount is: ' + this.ongoingTransactionData.getAmount());
      this.http.post<{fee: number}>('http://localhost:3000/api/v1/transactions/fee', {amount}) // <= change this to an 'real' object
        .subscribe(response => {

          console.log(response);
          this.ongoingTransactionData.setFee(response.fee); // get curren fee in % for frontend calculation of fee
          this.ongoingTransactionData
            .setTotalAmount((
                this.ongoingTransactionData.getAmount() + this.ongoingTransactionData.getFee()));
          console.log(this.ongoingTransactionData);
          this.ongoingTransactionListener.next(this.ongoingTransactionData);
          this.router.navigate(['/checkTransaction']);

        }, error => {
          // implement error case
        });
    }

    setOngoingTransactionData(transactionData: TransactionData) {
      this.ongoingTransactionData = transactionData;
      console.log(transactionData);
      this.ongoingTransactionListener.next(transactionData);
    }

    getOngoingTransactionData() {
      return this.ongoingTransactionData;
    }

    createTransactionData() {
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


    // TODO: change this to setOngoingTransactionData(), so everything can be handeled by one method
    setOngoingTransactionDataReceiver(receiver: string) {
      this.ongoingTransactionData.setReceiver(receiver);
      this.ongoingTransactionListener.next(this.ongoingTransactionData);
    }

    placeTransaction() {
      this.http.post<{message: string}>('http://localhost:3000/api/v1/transactions/create', this.ongoingTransactionData)
        .subscribe(response => {
          // ...response message
          console.log('transaction successfully created');
          this.ongoingTransactionData = null;
          this.router.navigate(['/home']);
        }, error => {
          console.log(error.message);
          // implement error cases here
          console.log('transaction failed');
        });
    }

    getOngoingTransactionListener() {
      return this.ongoingTransactionListener.asObservable();
    }

    getlastTransactionsListener() {
      return this.lastTransactionsListener.asObservable();
    }
}
