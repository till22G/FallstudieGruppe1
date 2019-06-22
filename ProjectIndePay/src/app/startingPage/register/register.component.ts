import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterUser } from 'src/app/shared/register-user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  user: RegisterUser;

  constructor() {}

  ngOnInit() {}

  onRegister(registerForm: NgForm) {
    this.user = new RegisterUser(registerForm.value.firstName,
                            registerForm.value.lastName,
                            registerForm.value.loginName,
                            registerForm.value.password,
                            registerForm.value.passwordRepeat);
    console.log(this.user.password);
    registerForm.reset();
    }

}
