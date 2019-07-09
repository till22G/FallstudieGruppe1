import { Component, OnInit, OnDestroy } from "@angular/core";
import { BalanceService } from "../../shared/services/balance.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { TransactionData } from "src/app/shared/models/transaction-data.model";
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { Router } from '@angular/router';
import { BalanceData } from 'src/app/shared/models/balance-data.model';

@Component({
  selector: "app-send-money",
  templateUrl: "./send-money.component.html",
  styleUrls: ["./send-money.component.css"]
})
export class SendMoneyComponent implements OnInit, OnDestroy {
  private currentBalanceListenerSub: Subscription;
  private ongoingTransactionListenerSub: Subscription;
  currentBalanceData = new BalanceData(null, null, null);
  ongoingTransactionData: TransactionData = null;

  constructor(private balanceService: BalanceService,
              private transactionService: TransactionsService,
              private router: Router) {}

  ngOnInit() {
    this.currentBalanceListenerSub = this.balanceService
      .getCurrentBalanceListener()
      .subscribe(currentBalanceData => {
        this.currentBalanceData = currentBalanceData;
      });
    this.ongoingTransactionListenerSub = this.transactionService
      .getOngoingTransactionListener()
      .subscribe(ongoingTransaction => {
        this.ongoingTransactionData = ongoingTransaction;
        console.log('subs triggered');
      });

    this.balanceService.submitCurrentBalanceData();

    if (this.transactionService.getOngoingTransactionData() == null) {
      this.transactionService.createTransaction();
    }
    // this.ongoingTransactionData = this.transactionService.getOngoingTransactionData();
  }

  // create transaction data based on the model
  // other attributes are filled an handled in the backend
  onContinueSendMoney(transactionForm: NgForm) {
    // yet to be implemented
  }

  onSearchInContacts() {
  this.router.navigate(['/searchContacts']);
  }

  ngOnDestroy() {
    this.currentBalanceListenerSub.unsubscribe();
  }
}
