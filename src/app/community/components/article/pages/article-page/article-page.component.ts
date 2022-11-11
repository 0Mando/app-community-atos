import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IArticle } from 'src/app/domain/models/ipost';
import { ArticleService } from 'src/app/infrastructure/services/article.service';

@Component({
	selector: 'app-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

	//* Article reference
	idArticle: string = '';
	// currentArticle: IArticle = {
	// 	title : '',
	// 	date : new Date(),
	// 	content : '',
	// 	firstName : '',
	// 	lastName : '',
	// 	channelParent : '',
	// 	boardParent : ''
	// };

	currentArticle: IArticle;
	displayArticle : boolean = false;

	constructor(
		private route: ActivatedRoute,
		private article: ArticleService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params: Params) => {
				this.idArticle = params['id']
			}
		)
		this.onFetchArticle(this.idArticle);
	}

	/**
	 * Get the information of the article
	 * @param idArticle Reference of the article
	 */
	onFetchArticle(idArticle: string) {
		this.article.getArticleById(idArticle).subscribe(
			(article: IArticle) => {
				this.currentArticle = {
					'title': article.title,
					'date': article.date,
					'content': article.content,
					'firstName': article.firstName,
					'lastName': article.lastName,
					'channelParent': article.channelParent,
					'boardParent': article.boardParent
				}
				this.displayArticle = true;
			}
		)
	}

	easterEgg(): void {
		console.log('%cHey you found my easter egg🐣',
		'color:yellow; font-size: 8rem;');
	}
}
