import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { BalanceData } from 'src/app/shared/models/balance-data.model';

@Component({
  selector: 'app-check-transaction',
  templateUrl: './check-transaction.component.html',
  styleUrls: ['./check-transaction.component.css']
})
export class CheckTransactionComponent implements OnInit, OnDestroy {
  private ongoingTransactioinsListenerSub = new Subscription();
  private placedTransactionListenerSub = new Subscription();
  ongoingTransactionData: TransactionData = null;
  currentBalanceData: BalanceData = null;
  transactionInProcess = false;

  constructor(  private transactionService: TransactionsService,
                private balanceService: BalanceService,
                private router: Router) { }

  ngOnInit() {
    this.placedTransactionListenerSub = this.transactionService
      .getTransactionPlacedListener()
      .subscribe(response => {
        this.transactionInProcess = response;
      });
    this.ongoingTransactioinsListenerSub = this.transactionService
      .getOngoingTransactionListener()
      .subscribe(transactionData => {
        this.ongoingTransactionData = transactionData;
      });
    this.ongoingTransactionData = this.transactionService.getOngoingTransactionData();
    this.currentBalanceData = this.balanceService.getCurrentBalanceData();
    console.log(this.ongoingTransactionData);
  }

  onConfirmTransaction() {
    this.transactionService.placeTransaction();
  }

  onBackToSendMoney() {
    this.router.navigate(['/sendMoney']);
  }

  ngOnDestroy()  {
    this.ongoingTransactioinsListenerSub.unsubscribe();
  }

}
