import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTransactions'
})
export class FilterTransactionsPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string, listCount: number): any {
    if (value.length === 0) {
      return value;
    }
    const resultArray = [];
    for (const transaction of value) {
      if (transaction[propName] === filterString || filterString === 'all') {
        resultArray.push(transaction);
        if (resultArray.length === listCount) {
          return resultArray;
        }
      }
    }
    return resultArray;
  }

}
