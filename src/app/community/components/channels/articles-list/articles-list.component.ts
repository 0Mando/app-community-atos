import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/domain/models/ipost';
import { User } from 'src/app/domain/models/user.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-articles-list',
	templateUrl: './articles-list.component.html',
	styleUrls: ['./articles-list.component.scss']
})
export class ChannelArticlesListComponent implements OnInit {

	posts: IArticle[];
	@Input() boardNameArticles: string;
	userProfilePicture: string = '';

	//* Pagination stuff
	postsLength: number;
	pagePost: number = 1;

	constructor(
		private articlesService: ArticleService,
		private auth: AuthService
	) { }

	ngOnInit(): void {
		this.fetchArticles(this.boardNameArticles);
	}

	private fetchArticles(boardName: string) {
		this.articlesService.fetchPostFromParentBoard<IArticle>(boardName).subscribe(
			(posts) => {
				this.posts = posts;
				this.postsLength = this.posts.length;
			}
		)
	}
}
