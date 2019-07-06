import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/startingPage/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ContactModel } from 'src/app/shared/contact-model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ContactService {
  private addContactListener = new Subject<{ successfull: boolean,
                                             message: string}>();

  private getContactListListener = new Subject<{  successful: boolean,
                                                  message: string,
                                                  contactList: [ContactModel]}>();

  constructor(  private http: HttpClient,
                private router: Router) {}

  addNewContact( newContact: ContactModel) {
    console.log(newContact);
    this.http.post<{message: string}>('http://localhost:3000/api/v1/contacts/create', newContact)
      .subscribe( response => {
                    console.log('contact created' + response.message);
                    const res = {successfull: true, message: response.message};
                    this.addContactListener.next(res);
                    this.router.navigate(['']); // navigate to next page
                  },
                  error => {
                    console.log('error from backend');
                    const eRes = {successfull: false, message: error.message};
                    this.addContactListener.next(eRes);
                  });
  }

  getContactList() {
    this.http.get<{message: string, contactList: [ContactModel]}>('')
      .subscribe( response => {
                    const res = { successful: true,
                                  message: response.message,
                                  contactList: response.contactList};
                    this.getContactListListener.next(res);
                  },
                  error => {
                    // implement the error case here => figure out what to do
                  });
  }

  getAddContactListener() {
    return this.addContactListener.asObservable();
  }

  gerGetContactListListener() {
    return this.getContactListListener.asObservable();
  }
}
