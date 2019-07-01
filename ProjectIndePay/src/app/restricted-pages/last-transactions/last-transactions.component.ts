import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../services/transactions.service';
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
  lastTransactions = [  {amount: 20, direction: 'sent', contact: 'phil' },
                        {amount: 320, direction: 'recieved', contact: 'tom' },
                        {amount: 9321, direction: 'recieved', contact: 'Hans' },
                        {amount: 5, direction: 'sent', contact: 'Lisa' },
                        {amount: 10, direction: 'recieved', contact: 'Anna' },
                        {amount: 1654, direction: 'recieved', contact: 'Leon' },
                        {amount: 21, direction: 'sent', contact: 'Mark' },
                        {amount: 2, direction: 'sent', contact: 'Akufu' },
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
