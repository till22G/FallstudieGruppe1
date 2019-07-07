import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactModel } from 'src/app/shared/contact-model';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-contancts',
  templateUrl: './search-contancts.component.html',
  styleUrls: ['./search-contancts.component.css']
})
export class SearchContanctsComponent implements OnInit, OnDestroy {
  private getContactListListenerSubs: Subscription;
  private getContactListErrorListenerSubs: Subscription;
  errorMessage = null;
  contactList: [ContactModel];
  pipeFilterValue = '';


  testContactList = [{loginName: 'tgalla', comment: 'blubb'},
                    {loginName: 'phil', comment: 'basda'},
                    {loginName: 'Jonathan', comment: 'bgfhfc'},
                    {loginName: 'Lucas', comment: 'mzf'},
                    {loginName: 'Mario', comment: ''},
                    {loginName: 'Hella', comment: 'btfzju'},
                    {loginName: 'Dirk', comment: 'wrbarebvszxrcs'},
                    {loginName: 'Gwen', comment: 'uzo,zg8o'}];









  constructor( private contactService: ContactService ) { }

  ngOnInit() {
    this.getContactListListenerSubs = this.contactService
      .getGetContactListListener()
      .subscribe( reqContactList => {
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
    this.getContactList();
  }

  onRefreshContactList() {
    console.log('onRefreshContactList called');
    this.getContactList();
  }

  private getContactList() {
    console.log('getContactList called');
    this.contactService.getContactList();
  }

  ngOnDestroy() {
    this.getContactListListenerSubs.unsubscribe();
    this.getContactListErrorListenerSubs.unsubscribe();
  }

}
