import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/startingPage/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ContactModel } from 'src/app/shared/contact-model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddNewContactService {
  private addUserListener = new Subject<{successfull: boolean, message: string}>();

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {}

  addNewContact(contactLoginName: string, comment: string) {
    const newContact = new ContactModel(contactLoginName, comment);
    this.http.post<{message: string}>('', newContact)
      .subscribe( response => {
                    const res = {successfull: true, message: response.message};
                    this.addUserListener.next(res);
                  },
                  error => {
                    const res = {successfull: false, message: error};
                    this.addUserListener.next(error);
                  });
  }

  getAddUserListener() {
    return this.addUserListener.asObservable();
  }

}
