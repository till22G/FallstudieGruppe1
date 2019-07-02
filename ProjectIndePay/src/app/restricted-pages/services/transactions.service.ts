import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/startingPage/authentication.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private currentListCountListener = new Subject<number>();

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

    // implement getTransactions here
    getTransactions() {
      this.http.get('')
        .subscribe(response => {

        })

    }


}
