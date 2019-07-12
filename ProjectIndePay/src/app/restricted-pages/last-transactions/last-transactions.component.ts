import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../../shared/services/transactions.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.css']
})
export class LastTransactionsComponent implements OnInit, OnDestroy {
  private lastTransactionsListenerSub = new Subscription();
  pipeFilterValue = 'all';
  // totalTransactions = 8;

  // variables which store the data for the paginiatior so these values can
  // be set and unsed to fetch the rigth data from the backend
  currentPage = 1;
  transactionsPerPage = 4;
  pageSizeOptions = [1, 2, 5, 10, 20];

  constructor(private router: Router, private transctionService: TransactionsService) { }


  onChangePipeFilter(filterValue: string) {
    this.pipeFilterValue = filterValue;
    console.log(filterValue);
  }

  onChangedPage(pageData: PageEvent) {
    // +1 so start with the indey at one (otherwise it would start at 0)
    // just for more convenient page naming => !!!! hast to be condisered in the backend implementation !!!!!!!
    this.currentPage = pageData.pageIndex + 1;
    this.transactionsPerPage = pageData.pageSize;
    this.transctionService.getTransactions(this.transactionsPerPage, this.currentPage);
  }

  ngOnInit() {
    // this.lastTransactionsListenerSub.

    // call the getTransaction method with the curren transactionsPerPage and
    // 1 so the first set of data (for page 1) can be fetched from the backend
    this.transctionService.getTransactions(this.transactionsPerPage, 1);
  }

  ngOnDestroy() {
    this.lastTransactionsListenerSub.unsubscribe();
  }
}
