import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionUser } from 'src/app/shared/sessionUser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //@ViewChild('loginForm', {static: false}) loginForm: NgForm;

  user: SessionUser;

  constructor() {}

  ngOnInit() {

  }

  onLogin(loginForm: NgForm) {
    this.user = new SessionUser(loginForm.value.loginName,
                                loginForm.value.password);
  }
}
