import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RegisterUser } from 'src/app/shared/models/register-user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  user: RegisterUser;
  isLoading = false;

  constructor(public authenticationService: AuthenticationService ) {}


  onRegister(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }
    else {
      this.authenticationService
      .register(registerForm.value.firstName,
        registerForm.value.lastName,
        registerForm.value.loginName,
        registerForm.value.password,
        registerForm.value.passwordRepeat);
      this.isLoading = true;
      }
    registerForm.reset();
    }

    ngOnInit() {}
}
