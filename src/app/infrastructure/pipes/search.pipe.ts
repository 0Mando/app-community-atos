import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: any, search: string): any {
    if(values){
      if(search === ''){
        return values;
      }
      const filterResult = [];
      for(const channel of values){
        if(channel.channelName.toLowerCase().indexOf(search.toLowerCase()) > -1){
          filterResult.push(channel);
        }
      }
      return filterResult;
    }
  }

}
