import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-transaction',
  templateUrl: './check-transaction.component.html',
  styleUrls: ['./check-transaction.component.css']
})
export class CheckTransactionComponent implements OnInit, OnDestroy {
  private ongoingTransactioinsListenerSub = new Subscription();
  ongoingTransactionData = null;

  constructor(private transactionService: TransactionsService, private router: Router) { }

  ngOnInit() {
    this.ongoingTransactioinsListenerSub = this.transactionService
      .getOngoingTransactionListener()
      .subscribe(transactionData => {
        this.ongoingTransactionData = transactionData;
      });
    this.ongoingTransactionData = this.transactionService.getOngoingTransactionData();
    console.log(this.ongoingTransactionData);
  }

  onConfirmTransaction() {

  }

  onBackToSendMoney() {
    this.router.navigate(['/sendMoney']);
  }

  ngOnDestroy()  {
    this.ongoingTransactioinsListenerSub.unsubscribe();
  }

}
