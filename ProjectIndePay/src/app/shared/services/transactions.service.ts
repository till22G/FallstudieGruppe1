import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransactionData } from 'src/app/shared/models/transaction-data.model';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private currentListCountListener = new Subject<number>();
  private transactions: Array<TransactionData> = [];

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

    // implement getTransactions here
    getTransactions() {
      this.http.get('')
        .subscribe(response => {

        });
    }
}
