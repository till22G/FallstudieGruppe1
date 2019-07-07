import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService } from '../../shared/services/balance.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit, OnDestroy {
  private currentBalanceListenerSub = new Subscription();
  currentBalanceData = null;
  transactionAmount = 0;
  selectedContact = 'tgalla';

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    this.currentBalanceListenerSub = this.balanceService
                                      .getCurrentBalanceListener()
                                      .subscribe(currentBalanceData => {
                                        this.currentBalanceData = currentBalanceData;
                                      });
    this.balanceService.getCurrentBalance();
  }

  onContinueSendMoney() {
    // implement send Money here
  }

  ngOnDestroy() {
    this.currentBalanceListenerSub.unsubscribe();
  }

}
