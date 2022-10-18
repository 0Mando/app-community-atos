import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-articles-list',
	templateUrl: './articles-list.component.html',
	styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

	articles = [1,2,3,4,5,6]

	//* Pagination stuff
	articlesLength: number = this.articles.length;
	page : number = 1;

	constructor() { }

	ngOnInit(): void {
	}

}
