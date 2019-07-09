import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../../shared/services/contact.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactModel } from 'src/app/shared/models/contact-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.css']
})
export class AddNewContactComponent implements OnInit, OnDestroy {

  private addContactListenerSubs: Subscription;
  errorMessage: string = null;
  addContectSuccesssful = true;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.addContactListenerSubs = this.contactService
      .getAddContactListener()
      .subscribe(contactAdded => {
          if (contactAdded.successfull) {
            this.addContectSuccesssful = true;
              // display success message and rerout to next step
          } else {
            this.errorMessage = contactAdded.message;
            this.addContectSuccesssful = contactAdded.successfull;
          }
      });
  }

  onAddContact(addContactForm: NgForm) {
    if (addContactForm.invalid) {     // check if form is valid
      return;
    }
    console.log(addContactForm.value.contactName);
    const newContact = new ContactModel(addContactForm.value.contactName,
                                        addContactForm.value.comment);
    this.contactService
        .addNewContact(newContact);
    addContactForm.reset();
  }

  onResetErrorMessage() {
    this.errorMessage = null;
  }

  onBackToSearchContacts() {
    this.router.navigate(['/searchContacts']);
  }

  ngOnDestroy() {
    this.addContactListenerSubs.unsubscribe();
  }
}
