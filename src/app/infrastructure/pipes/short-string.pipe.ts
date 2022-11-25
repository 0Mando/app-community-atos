import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

	transform(text : string, length : number): string {
		if(text.length > length){
			return text.substring(0,length) + '...';
		}
		return text;
	}
}
