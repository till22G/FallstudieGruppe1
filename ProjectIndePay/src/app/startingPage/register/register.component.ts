import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterUser } from 'src/app/shared/register-user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  user: RegisterUser;

  constructor(public authenticationService: AuthenticationService ) {}

  ngOnInit() {}

  // resets form after object creation
  onRegister(registerForm: NgForm) {
    if (registerForm.invalid){
      return;
    }
    else {
      this.authenticationService
      .register(registerForm.value.firstName,
                registerForm.value.lastName,
                registerForm.value.loginName,
                registerForm.value.password,
                registerForm.value.passwordRepeat);
    }
    registerForm.reset();
    }

}
