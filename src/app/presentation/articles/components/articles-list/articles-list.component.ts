import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { IArticle } from '../../model/ipost';
import { ArticleService } from '../../services/article.service';
import { User } from '../../../../domain/models/user.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-articles-list',
	templateUrl: './articles-list.component.html',
	styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit, AfterViewInit, OnDestroy {

	posts: IArticle[];
	@Input() category: string;
	articles$ : Subscription;

	//* Pagination stuff
	articlesLength: number;
	page: number = 1;
	currentUser: User;

	constructor(
		private articleService: ArticleService,
		private authenticationService: AuthService
	) { }

	ngOnInit(): void {
		console.log('Category : ' + this.category);
		console.log('-------------------------------');
		this.articles$ = this.authenticationService.getUserById<User>().subscribe(
			(user: User) => {
				console.table(user);
				this.currentUser = user;
			}
		)
		this.displayArticles(this.category);
	}

	ngAfterViewInit() {
		this.displayArticles(this.category);
	}

	displayArticles(category: string) {
		this.articleService.displayPost<IArticle>(category).subscribe(
			posts => {
				this.posts = posts;
				this.articlesLength = this.posts.length;
			}
		)
	}

	displayModeratorOptions(): boolean {
		console.log('--------------Permisos---------------');
		return this.currentUser.userType === 'moderator';
	}

	ngOnDestroy(): void {
		console.log('Destory');
		this.articles$.unsubscribe()
	}
}
