import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddNewContactService } from '../services/add-contact.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.css']
})
export class AddNewContactComponent implements OnInit, OnDestroy {

  private addContactListenerSubs: Subscription;
  errorMessage: string;
  addContectSuccesssful = true;

  constructor(private addNewContactService: AddNewContactService) { }

  ngOnInit() {
    this.addContactListenerSubs = this.addNewContactService
      .getAddUserListener()
      .subscribe(contactAdded => {
          if (contactAdded.successfull) {
            this.addContectSuccesssful = true;
              // display success message and rerout to next step
          }
          else {
            this.errorMessage = contactAdded.message;
            this.addContectSuccesssful = contactAdded.successfull;
          }
      });
  }

  onAddContact(addContactForm: NgForm) {
    if (addContactForm.invalid) {     // check if form is valid
      return;
    } else {
      this.addNewContactService
        .addNewContact( addContactForm.value.contactName,
                        addContactForm.value.comment);
    }
  }


  ngOnDestroy() {
    this.addContactListenerSubs.unsubscribe();
  }
}
