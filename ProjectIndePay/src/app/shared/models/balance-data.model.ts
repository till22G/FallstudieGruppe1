export class BalanceData {

  constructor(private balance: number,
              private currency: string,
              private fee: number) {}

  getBalance() {
    return this.balance;
  }

  getCurrency() {
    if (this.currency != null) {
      return this.currency;
    } else { return ''; }
  }

  getFee() {
    return this.fee;
  }

  setBalance(balance: number) {
    this.balance = balance;
  }
}
