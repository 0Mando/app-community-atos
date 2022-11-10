import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { IArticle } from '../../model/ipost';
import { ArticleService } from '../../services/article.service';

@Component({
	selector: 'app-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

	articleId : string = '';
	currentPost : any;

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
		this.getArticleById(this.articleId).catch(
			error => {
				console.log('Something went wrong ' + error);
			}
		);
	}

	async getArticleById(id : string) :Promise<void> {
		this.articleService.getArticleById(id).subscribe(
			post => {
				this.currentPost = post;
			}
		)
	}

	easterEgg() : void {
		console.log('%cHey you found my easter egg🐣', 'color:yellow; font-size: 8rem;');
	}

	convertTiemstampToDate(timestamp : number){
		let publishDate = new Date(timestamp);
		return publishDate.getDate() + "/" + (publishDate.getMonth() + 1) + "/" + publishDate.getFullYear();
	}

}
