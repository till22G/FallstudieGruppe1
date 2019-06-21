import { keyframes } from '@angular/animations';

export class User {
  public firstName: string;
  public lastName: string;
  public loginName: string;

  constructor(firstName: string, lastName: string, loginName: string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.loginName = loginName;
  }
}
