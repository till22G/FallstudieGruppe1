import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactModel } from 'src/app/shared/models/contact.model';
import { ContactService } from '../../shared/services/contact.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-search-contancts',
  templateUrl: './search-contancts.component.html',
  styleUrls: ['./search-contancts.component.css']
})
export class SearchContanctsComponent implements OnInit, OnDestroy {

  private getContactListListenerSubs: Subscription;
  private getContactListErrorListenerSubs: Subscription;

  errorMessage = null;
  contactList: [ContactModel] = null;
  pipeFilterValue = '';

  constructor(private contactService: ContactService,
    private transactionService: TransactionsService,
    private router: Router) { }

  ngOnInit() {
    this.getContactListListenerSubs = this.contactService
      .getGetContactListListener()
      .subscribe(reqContactList => {
        this.errorMessage = null;
        this.contactList = reqContactList.contactList;
      });
    this.getContactListErrorListenerSubs = this.contactService
      .getGetContactListErrorListener()
      .subscribe(error => {
        console.log('error subs');
        console.log(error.errorMessage);
        this.errorMessage = error.errorMessage;
      });

    if (this.contactService.getCurrentContactList() == null) {
      console.log('contactList is null');
      this.contactService.getContactList();
    } else { this.contactList = this.contactService.getCurrentContactList(); }
  }

  onRefreshContactList() {
    console.log('onRefreshContactList called');
    this.contactService.getContactList();
  }

  onEditContact() {
    // for now no coding, just 'interface' option
    // idea: send forward with loginName to modefied add-contact module
    // => insert a edit and delete button and make input field for login name
    // no changeable when redirected with this method
  }

  onSelectContact(loginName: string) {
    console.log(loginName);
    this.transactionService.setOngoingTransactionDataReceiver(loginName);
    this.router.navigate(['/sendMoney']);
  }

  onBackToSendMoney() {
    this.router.navigate(['/sendMoney']);
  }

  onAddNewContact() {
    this.router.navigate(['/addNewContact']);
  }

  ngOnDestroy() {
    this.getContactListListenerSubs.unsubscribe();
    this.getContactListErrorListenerSubs.unsubscribe();
  }

}
