import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: User;

  constructor() {}

  ngOnInit() {

  }

  onLogin(form: NgForm) {

    //this.userLogin = new User();
  }
}
