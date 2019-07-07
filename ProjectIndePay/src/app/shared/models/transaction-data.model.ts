export class TransactionData {

  constructor(  private transactionDate: Date,
                private totalAmount: number,
                private amount: number,
                private fee: number,
                private currency: string,
                private receiver: string,
                private sender: string,
                private category: string,
                private comment: string) {}
}
