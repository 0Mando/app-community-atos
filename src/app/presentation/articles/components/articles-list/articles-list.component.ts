import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../model/ipost';
import { ArticleService } from '../../services/article.service';

@Component({
	selector: 'app-articles-list',
	templateUrl: './articles-list.component.html',
	styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

	posts : IPost[];
	@Input() category: string;

	//* Pagination stuff
	articlesLength: number;
	page : number = 1;

	constructor(private articleService : ArticleService) { }

	ngOnInit(): void {
		console.log('Category : '+ this.category);
		this.displayArticles(this.category);
	}

	displayArticles(category : string) {
		this.articleService.displayPost<IPost>(category).subscribe(
			posts => {
				this.posts = posts;
				this.articlesLength = this.posts.length;
			}
		)
	}
}
