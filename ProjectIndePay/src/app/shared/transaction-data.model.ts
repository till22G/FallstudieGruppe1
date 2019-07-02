export class TransactionData {

  constructor(  private transactionDate: Date,
                private amount: number,
                private fee: number,
                private currency: string,
                private categroy: string,
                private comment: string) {}
}
