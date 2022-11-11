import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IArticle } from 'src/app/domain/models/ipost';
import { User } from 'src/app/domain/models/user.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

import { ArticleCardComponent } from '../../components/article-card/article-card.component';

@Component({
	selector: 'app-list-articles',
	templateUrl: './list-articles.component.html',
	styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

	//* Information of origin
	channelName : string = '';
	boardName : string = '';

	//* List of articles
	articles: IArticle[];

	//* Pagination stuff
	lengthListArticles : number = 0;
	page: number = 1;

	constructor(
		private route: ActivatedRoute,
		private router : Router,
		private article : ArticleService,
		private auth : AuthService
	) { }

	ngOnInit(): void {
		// Board and channel origin
		this.route.params.subscribe(
			(params : Params)=>{
				this.channelName = params['channelName']
				this.boardName = params['parentBoard']
			}
		)

		// Display list of articles
		this.onFetchArticles();

		// Get user information to check if you can publish an article
		// this.auth.getUserById<User>().subscribe()
	}

	/**
	 * Verify if user is logged to publish an article.
	 * @returns Confirmation if the user is logged in or not.
	 */
	userIsLogged() : boolean {
		return this.auth.isLoggedIn;
	}

	isVerified() : boolean {
		return true;
	}

	/**
	 * Redirect to the create article page if you are registered and verified.
	 */
	onCreateArticle() {
		if(this.userIsLogged() && this.isVerified()){
			this.router.navigate(['create-article'], { queryParams : {
				channel : this.channelName,
				board : this.boardName
			} });
		} else if(this.userIsLogged() && !this.isVerified()) {
			alert('Please verified your accout');
		} else {
			alert('Please login');
		}
	}

	/**
	 * Fetch the articles from the channel.
	 */
	onFetchArticles() {
		this.article.displayPost<IArticle>(this.channelName).subscribe(
			articles => {
				this.articles = articles;
				this.lengthListArticles = this.articles.length;
				console.log(this.articles);
			}
		)
	}
}
