import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {

  transform(value: any, filterString: string): any {
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }
    console.log();
    const resultArray = [];
    for (const contact of value) {
      console.log(contact.contactLoginName.substr(0, filterString.length));
      console.log(filterString);
      if (filterString.toLocaleLowerCase() === contact.contactLoginName.substr(0, filterString.length).toLocaleLowerCase()) {
        console.log('match found');
        resultArray.push(contact);
      }
    }
    return resultArray;
  }
}
