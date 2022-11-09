import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/presentation/articles/model/ipost';
import { ArticleService } from 'src/app/presentation/articles/services/article.service';

@Component({
	selector: 'app-articles-list',
	templateUrl: './articles-list.component.html',
	styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponentChannel implements OnInit {

	posts : IPost[];
	@Input() boardNameArticles : string;

	//* Pagination stuff
	postsLength: number;
	pagePost : number = 1;

	constructor(
		private articlesService : ArticleService
	) { }

	ngOnInit(): void {
		this.fetchArticles(this.boardNameArticles);
	}

	private fetchArticles(boardName : string) {
		this.articlesService.fetchPostFromParentBoard<IPost>(boardName).subscribe(
			(posts)  => {
				this.posts = posts;
				this.postsLength = this.posts.length;
			}
		)
	}
}
