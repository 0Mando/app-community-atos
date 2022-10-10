import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatUrl'
})
export class FormatUrlPipe implements PipeTransform {

	transform(boardTitle: string): string {
		let formatUrl: string = boardTitle;
		let link = formatUrl.split(' ').join('-');;

		return link;
	}

}
