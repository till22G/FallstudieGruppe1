import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../../shared/services/transactions.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';

@Component({
  selector: 'app-last-transactions',
  templateUrl: './last-transactions.component.html',
  styleUrls: ['./last-transactions.component.css']
})
export class LastTransactionsComponent implements OnInit, OnDestroy {
  private lastTransactionsListenerSub = new Subscription();

  isLoading = false;

  lastTransactions: [TransactionData] = null;
  pipeFilterValue = 'all';
  // totalTransactions = 8;

  // variables which store the data for the paginiatior so these values can
  // be set and unsed to fetch the rigth data from the backend
  transactionsPerPage = 4;
  totalTransactions = 10;
  currentPage = 1;
  pageSizeOptions = [3, 5, 10, 20];

  constructor(private router: Router, private transctionService: TransactionsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.lastTransactionsListenerSub = this.transctionService.getlastTransactionsListener()
      .subscribe(lastTransactions => {
        this.lastTransactions = lastTransactions;
        this.isLoading = false;
        console.log(this.lastTransactions);
      });

    // call the getTransaction method with the curren transactionsPerPage and
    // 1 so the first set of data (for page 1) can be fetched from the backend
    this.transctionService.getTransactions(this.transactionsPerPage, this.currentPage);
  }

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


  ngOnDestroy() {
    this.lastTransactionsListenerSub.unsubscribe();
  }
}
