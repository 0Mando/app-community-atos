import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeString'
})
export class RemoveStringPipe implements PipeTransform {

  transform(value: string, arg: string): unknown {
    return value.replace(arg,'');
  }

}
