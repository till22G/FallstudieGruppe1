import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactModel } from 'src/app/shared/models/contact-model';
import { ContactService } from '../../shared/services/contact.service';
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
                    {loginName: 'Gwen', comment: 'uzo,zg8o'},
                    {loginName: 'Glen', comment: 'uzo,zg8o'}];









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

  onEditContact() {
    // for now no coding, just 'interface' option
    // idea: send forward with loginName to modefied add-contact module
    // => insert a edit and delete button and make input field for login name
    // no changeable when redirected with this method
  }

  onSelectContact(loginName: string) {
    console.log(loginName);
    // forward to send mony module with login name
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
