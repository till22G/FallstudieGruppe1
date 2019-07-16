import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';
import { Router } from '@angular/router';
import { BalanceService } from './balance.service';
import { NotifierService } from 'angular-notifier';

@Injectable({providedIn: 'root'})
export class TransactionsService {

  private ongoingTransactionListener = new Subject<TransactionData>();
  private lastTransactionsListener = new Subject<TransactionData[]>();
  private transactionPlacedListener = new Subject<boolean>();
  private lastTransactions: TransactionData[] = [];
  ongoingTransactionData: TransactionData = null;


    constructor(  private http: HttpClient,
                  private router: Router,
                  private balanceService: BalanceService,
                  private notifier: NotifierService) {}

    // implement getTransactions here
    getTransactions(transactionsPerPage: number, currentPage: number) {
      const queryParams = `?pagesize=${transactionsPerPage}&page=${currentPage}`;
      console.log('getTransactions() called: ' + 'http:localhost:3000/api/v1/transactions/last' + queryParams);
      this.http.get<{message: string, transactionArray: [TransactionData]}>('http:localhost:3000/api/v1/transactions/last/' + queryParams)
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

      placeTransaction() {
        this.transactionPlacedListener.next(true);
        this.http.post<{message: string}>('http://localhost:3000/api/v1/transactions/create', this.ongoingTransactionData)
          .subscribe(response => {
            console.log('transaction successfully placed');
            this.transactionPlacedListener.next(false);
            this.ongoingTransactionData = null;
            this.router.navigate(['/home']);
            this.notifier.notify('success', 'transaction was placed succesfully');
           }, error => {
            this.transactionPlacedListener.next(false);
            this.notifier.notify('error', error.message);
            console.log('transaction failed');
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
        null, // transactionData
        null, // totalAmount
        null, // amount
        null, // fee
        null, // currency
        null, // receiver
        null, // sender
        null, // category
        null  // comment
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


    getOngoingTransactionListener() {
      return this.ongoingTransactionListener.asObservable();
    }

    getlastTransactionsListener() {
      return this.lastTransactionsListener.asObservable();
    }

    getTransactionPlacedListener() {
      return this.transactionPlacedListener.asObservable();
    }
}
