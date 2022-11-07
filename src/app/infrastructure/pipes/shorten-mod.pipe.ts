import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenMod'
})
export class ShortenModPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return !value ? '' : value.split(' |')[0];
  }

}
