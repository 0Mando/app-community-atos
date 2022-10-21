import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
	selector: 'app-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

	articleId : string = '';

	constructor(
		private route : ActivatedRoute,
		private articleService : ArticleService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params : Params) => {
				this.articleId = params['id']
			}
		)
	}

}
