import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstword'
})
export class FirstwordPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return !value ? '' : value.split(' ')[0];
  }

}
