import { Pipe, PipeTransform } from '@angular/core';
import { LeaveInfo } from './auth/leave-info';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(leaves: LeaveInfo[], searchValue: string): LeaveInfo[] {
    if (!leaves || !searchValue) {
      return leaves;
    }
    return leaves.filter(trainer =>
      trainer.description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      trainer.date.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );

  }

}