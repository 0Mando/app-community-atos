import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'shortTitleArticle'
})
export class ShortTitleArticlePipe implements PipeTransform {

	/**
	 * Reduce the title length and concatenate 3 dots at the end.
	 * @param title Article title.
	 * @param length Expected title length.
	 * @returns Short title concatenated with three dots.
	 */
	transform( title : string, length : number ): string {
		return title.substring(0,length) + '...';
	}

}
