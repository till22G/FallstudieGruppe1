import { Component, OnInit, OnDestroy } from "@angular/core";
import { BalanceService } from "../../shared/services/balance.service";
import { Subscription } from "rxjs";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
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

  sendMoneyForm = new FormGroup({
    transactionAmount: new FormControl(),
    comment: new FormControl(),
    selectedContact: new FormControl()
  });

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
      this.transactionService.createTransactionData();
    }
    this.ongoingTransactionData = this.transactionService.getOngoingTransactionData();
    this.sendMoneyForm.setValue({
      transactionAmount: this.ongoingTransactionData.getAmount(),
      comment: this.ongoingTransactionData.getComment(),
      selectedContact: this.ongoingTransactionData.getReceiver()
    });
  }

  // create transaction data based on the model
  // other attributes are filled an handled in the backend
  onSubmit(type: string, transactionForm: NgForm) {
    this.ongoingTransactionData.setComment(transactionForm.value.comment);
    this.ongoingTransactionData.setAmount(transactionForm.value.transactionAmount);
    this.ongoingTransactionData.setReceiver(transactionForm.value.selectedContact);
    this.transactionService.setOngoingTransactionData(this.ongoingTransactionData);
    if (type === 'checkTransaction') {
      console.log('send-money.comp: ' + this.ongoingTransactionData);
      this.transactionService.forwardToCheckTransaction(this.ongoingTransactionData);
    } else if ( type === 'selectContact') {
      this.router.navigate(['/searchContacts']);
    }
  }

  onSearchInContacts() {

  this.router.navigate(['/searchContacts']);
  }

  ngOnDestroy() {
    this.currentBalanceListenerSub.unsubscribe();
    this.ongoingTransactionListenerSub.unsubscribe();
  }
}
