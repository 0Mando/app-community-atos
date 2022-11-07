import { Pipe, PipeTransform } from '@angular/core';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  timeAgo = new TimeAgo('en-US')

  transform(value: number, ...args: unknown[]): unknown {
    return this.timeAgo.format(value);
  }

}
