import { OnInit, Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RegisterUser } from 'src/app/shared/models/register-user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit, OnDestroy {

  private registerUserIsLoadingListenerSub = new Subscription();

  user: RegisterUser;
  isLoading = false;

  constructor(public authenticationService: AuthenticationService, ) {}

  ngOnInit() {
    this.registerUserIsLoadingListenerSub = this.authenticationService.getRegisterUserIsLoadingListener()
      .subscribe(response => {
        this.isLoading = response;
      });
  }

  onRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }
    else {
      this.authenticationService
      .register(
        registerForm.value.firstName,
        registerForm.value.lastName,
        registerForm.value.loginName,
        registerForm.value.password,
        registerForm.value.passwordRepeat);
      }
    registerForm.reset();
    }

    ngOnDestroy() {
      this.registerUserIsLoadingListenerSub.unsubscribe();
    }
}
