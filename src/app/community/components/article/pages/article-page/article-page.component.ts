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
		this.onFetchArticle(this.idArticle);
	}

	/**
	 * Get the information of the article
	 * @param idArticle Reference of the article
	 */
	onFetchArticle(idArticle : string) {
		this.article.getArticleById(idArticle).subscribe(
			(article : IArticle) =>{
				this.currentArticle = {
					'title' : article.title,
					'date' : article.date,
					'content' : article.content,
					'firstName' : article.firstName,
					'lastName' : article.lastName,
					'channelParent' : article.channelParent,
					'boardParent' : article.boardParent
				}
			}
		)
	}

	easterEgg() : void {
		console.log('%cHey you found my easter egg🐣', 'color:yellow; font-size: 8rem;');
	}
}
