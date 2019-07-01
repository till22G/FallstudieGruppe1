import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})

export class BalanceComponent implements OnInit {
  currentBalance: number;

  constructor(private balanceService: BalanceService) { }


  ngOnInit() {
    const currentBalance = this.balanceService.getInitialBalance();
    this.currentBalance = currentBalance;
  }

}
