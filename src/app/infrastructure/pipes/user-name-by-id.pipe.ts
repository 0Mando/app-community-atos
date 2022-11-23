import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNameById'
})
export class UserNameByIdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
