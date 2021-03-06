import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactModel } from '../models/contact.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({ providedIn: 'root' })
export class ContactService {

  private addContactListener = new Subject<{
    successfull: boolean,
    message: string
  }>();
  private getContactListListener = new Subject<{
    successful: boolean
    contactList: [ContactModel]
  }>();
  private getContactListErrorListener = new Subject<{ errorMessage: string }>();

  private currentContactList: [ContactModel] = null;

  constructor(private http: HttpClient,
    private router: Router,
    private notifier: NotifierService) { }

  addNewContact(newContact: ContactModel) {
    this.http.post<{ message: string }>('http://localhost:3000/api/v1/contacts', newContact)
      .subscribe(response => {
        console.log('contact created' + response.message);
        const res = { successfull: true, message: response.message };
        this.addContactListener.next(res);
        this.router.navigate(['/searchContacts']); // back to search-contacts.component
        this.notifier.notify('success', 'contact successfully created');
      },
        error => {
          console.log('error from backend');
          const eRes = { successfull: false, message: error.message };
          this.addContactListener.next(eRes);
          this.notifier.notify('error', 'error while creating new contact');
        });
  }

  getContactList() {
    console.log('getContactList.service called');
    this.http.get<{ message: string, contactList: [ContactModel] }>('http://localhost:3000/api/v1/contacts/read')
      .subscribe(response => {
        const res = {
          successful: true,
          contactList: response.contactList
        };
        this.currentContactList = response.contactList;
        this.getContactListListener.next(res);
        console.log(res.contactList);
      },
        error => {
          console.log(error);
          this.notifier.notify('error', 'error at fetching contact list');
          this.getContactListErrorListener.next(error.message);
        });
  }

  // implement edit contact with http.put

  getCurrentContactList() {
    return this.currentContactList;
  }

  // get the observalbes in this block
  // ---------------------------------
  getAddContactListener() {
    return this.addContactListener.asObservable();
  }

  getGetContactListListener() {
    return this.getContactListListener.asObservable();
  }

  getGetContactListErrorListener() {
    return this.getContactListErrorListener.asObservable();
  }
  // ---------------------------------
}
