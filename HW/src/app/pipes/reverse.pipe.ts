import { Pipe, PipeTransform } from '@angular/core';
import { Column } from '../models/column.model';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform<T>(value: Column[]): Column[] {
    console.log('transform');
    return value.slice().reverse();
  }
}
