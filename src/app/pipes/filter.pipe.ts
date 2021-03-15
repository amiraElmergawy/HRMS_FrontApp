import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string): any {
    if (value?.length == 0 || filterString == '') {
      return value;
    } else {
      const resultArray = [];
      for (const emp of value) {
        if (emp.personalData.name.includes(filterString)) {
          resultArray.push(emp);
        }
      }
      return resultArray;
    }
  }
}
