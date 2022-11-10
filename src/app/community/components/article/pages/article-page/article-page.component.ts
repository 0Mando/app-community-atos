import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IArticle } from 'src/app/presentation/articles/model/ipost';
import { ArticleService } from 'src/app/presentation/articles/services/article.service';

@Component({
	selector: 'app-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

	//* Article reference
	idArticle : string = '';
	currentArticle : IArticle;

	constructor(
		private route : ActivatedRoute,
		private article : ArticleService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params : Params) => {
				this.idArticle = params['id']
			}
		)
	}

	easterEgg() : void {
		console.log('%cHey you found my easter egg🐣', 'color:yellow; font-size: 8rem;');
	}
}
