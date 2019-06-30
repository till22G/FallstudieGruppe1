import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/startingPage/authentication.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TransactionsService {
  private currentListCountListener = new Subject<number>();

    constructor(private authenticationService: AuthenticationService) {}

}
