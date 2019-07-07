export class RegisterUser {
  firstName: string;
  lastName: string;
  loginName: string;
  password: string;
  repeatPassword: string;

  constructor(firstName: string,
              lastName: string,
              loginName: string,
              password: string,
              repeatPassword: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.loginName = loginName;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }
}
