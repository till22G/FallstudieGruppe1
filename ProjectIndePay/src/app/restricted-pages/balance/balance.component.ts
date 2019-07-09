import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService } from '../../shared/services/balance.service';
import { Subscription } from 'rxjs';
import { BalanceData } from 'src/app/shared/models/balance-data.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})

export class BalanceComponent implements OnInit, OnDestroy {
  private currentBalanceListenerSub = new Subscription();
  currentBalanceData: BalanceData;

  constructor(private balanceService: BalanceService) { }


  ngOnInit() {
    this.currentBalanceListenerSub = this.balanceService
      .getCurrentBalanceListener()
      .subscribe(currentBalanceData => {
         this.currentBalanceData = currentBalanceData;
      });
    this.balanceService.getCurrentBalance();
  }

  ngOnDestroy() {
    this.currentBalanceListenerSub.unsubscribe();
  }
}
