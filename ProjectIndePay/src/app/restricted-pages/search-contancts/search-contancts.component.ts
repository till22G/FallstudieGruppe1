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
  contactList: [ContactModel];

  constructor( private contactService: ContactService ) { }

  ngOnInit() {
    this.getContactListListenerSubs = this.contactService
      .gerGetContactListListener()
      .subscribe( reqContactList => {
        this.contactList = reqContactList.contactList;
      });
  }

  ngOnDestroy() {
    this.getContactListListenerSubs.unsubscribe();
  }

}
