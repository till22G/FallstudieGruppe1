export class BalanceData {
  constructor(private balance: number,
              private currency: string,
              private fee: number) {}

  getBalance() {
    return this.balance;
  }

  getCurrency() {
    return this.currency;
  }

  getFee() {
    return this.fee;
  }
}
