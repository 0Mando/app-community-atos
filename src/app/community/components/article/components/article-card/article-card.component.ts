import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-article-card',
	templateUrl: './article-card.component.html',
	styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

	@Input() firstName : string;
	@Input() lastName : string;
	@Input() date : Date;
	@Input() idArticle : string;
	@Input() title : string;
	@Input() content : string;

	constructor() { }

	ngOnInit(): void {
	}

}
