import { Component, OnInit, OnDestroy } from "@angular/core";
import { BalanceService } from "../../shared/services/balance.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { TransactionData } from "src/app/shared/models/transaction-data.model";
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-send-money",
  templateUrl: "./send-money.component.html",
  styleUrls: ["./send-money.component.css"]
})
export class SendMoneyComponent implements OnInit, OnDestroy {
  private currentBalanceListenerSub = this.balanceService.getCurrentBalanceListener();
  private currentBalancData = {};
  selectedContact = 'tgalla'

  constructor(private balanceService: BalanceService,
              private transactionService: TransactionsService,
              private router: Router) {}

  ngOnInit() {
    this.currentBalanceListenerSub = this.balanceService
      .getCurrentBalanceListener()
      .subscribe(currentBalanceData => {
        this.currentBalanceData = currentBalanceData;
      });
    this.balanceService.getCurrentBalance();
  }

  // create transaction data based on the model
  // other attributes are filled an handled in the backend
  onContinueSendMoney(transactionForm: NgForm) {
    const transactionData = new TransactionData(
       null,
       null,
       transactionForm.value.transactionAmount,
       null,
       null,
       transactionForm.value.selectedContact,
       null,
       null,
       transactionForm.value.comment
     );
    console.log(transactionData);
    this.transactionService.forwardToCheckTransaction(transactionData);
  }

  onSearchInContacts() {
  this.router.navigate(['/searchContacts']);
  }

  onAddNewContact() {
    this.router.navigate(['/addNewContact']);
  }

  ngOnDestroy() {
    this.currentBalanceListenerSub.unsubscribe();
  }
}
