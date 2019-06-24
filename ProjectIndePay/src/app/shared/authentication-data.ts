export class AuthenticationData {
  public loginName: string;
  public password: string;

  constructor(loginName: string, password: string) {
    this.loginName = loginName;
    this.password = password;
  }
}
