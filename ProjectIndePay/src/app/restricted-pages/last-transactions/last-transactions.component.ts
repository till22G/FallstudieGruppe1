import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../../shared/services/transactions.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.css']
})
export class LastTransactionsComponent implements OnInit {
  pipeFilterValue = 'all';
  totalTransactions = 8;
  transactionsPerPage = 4;
  pageSizeOptions = [1, 2, 5, 10, 20];
  lastTransactions = [  { transactionDate: '01.01.2013',
                          totalAmount: 20.04,
                          amount: 20,
                          fee: 0.04,
                          currency: 'USH',
                          receiver: 'phil',
                          category: 'tranfer',
                          comment: 'dept' },
                        ];

  constructor(private router: Router, private transctionService: TransactionsService) { }


  onChangePipeFilter(filterValue: string) {
    this.pipeFilterValue = filterValue;
    console.log(filterValue);
  }

  onChangedPage(pageDate: PageEvent) {
  }

  ngOnInit() {
  }
}
