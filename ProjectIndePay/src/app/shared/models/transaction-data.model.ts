import { getMatIconNameNotFoundError } from '@angular/material';

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

  getAmount() {
    if (this.amount == null) {
     return  0;
    } else { return this.amount; }
  }

  getReceiver() {
    if (this.receiver == null) {
      return '';
    } else {return this.receiver; }
  }

  getComment() {
    if (this.comment == null) {
      return '';
    } else {return this.comment; }
  }

  setFee(fee: number) {
    this.fee = fee;
  }

  setReceiver(receiver: string) {
    this.receiver = receiver;
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  setComment(comment: string) {
    this.comment = comment;
  }
}
