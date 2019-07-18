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

  currentBalanceData = new BalanceData(null, null, null);

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    this.currentBalanceListenerSub = this.balanceService
      .getCurrentBalanceListener()
      .subscribe(currentBalanceData => {
        this.currentBalanceData = currentBalanceData;
        console.log('balComp: ' + currentBalanceData.getBalance());
      }, error => {
        console.log('error');
      });
    this.balanceService.getCurrentBalance();
    this.balanceService.submitCurrentBalanceData();
  }

  ngOnDestroy() {
    this.currentBalanceListenerSub.unsubscribe();
  }
}
