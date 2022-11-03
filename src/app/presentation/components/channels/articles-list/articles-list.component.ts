import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/presentation/articles/model/ipost';
import { ArticleService } from 'src/app/presentation/articles/services/article.service';

@Component({
	selector: 'app-articles-list',
	templateUrl: './articles-list.component.html',
	styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

	posts : IPost[];

	//* Pagination stuff
	postsLength: number;
	pagePost : number = 1;

	constructor(
		private articlesService : ArticleService
	) { }

	ngOnInit(): void {
		this.fetchArticles();
	}

	private fetchArticles() {
		this.articlesService.getAllPosts<IPost>().subscribe(
			(posts)  => {
				this.posts = posts;
				this.postsLength = this.posts.length;
			}
		)
	}
}
