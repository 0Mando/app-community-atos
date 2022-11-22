import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel.model';
import { IArticle } from 'src/app/domain/models/ipost';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-list-articles',
	templateUrl: './list-articles.component.html',
	styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

	//* Information of origin
	channelId : string = '';

	//* List of articles
	articles: IArticle[];

	//* Pagination stuff
	lengthListArticles : number = 0;
	page: number = 1;

	currentChannel : Channel = {
		channelName : '',
		channelDescription : '',
		channelImage : '',
		parentBoard : ''
	}

	constructor(
		private route: ActivatedRoute,
		private router : Router,
		private article : ArticleService,
		private auth : AuthService,
		private channel : ChannelService
	) { }

	ngOnInit(): void {
		// Channel origin
		this.route.params.subscribe(
			(params : Params)=>{
				this.channelId = params['channelId']
			}
		)
		// Display name of the channel
		this.onFetchChannelName(this.channelId);
		// Display list of articles
		this.onFetchArticles();
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
			this.router.navigate(['create-article'], { queryParams : { channelId : this.channelId } } );
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
		this.article.displayPost<IArticle>(this.channelId).subscribe(
			articles => {
				this.articles = articles;
				this.lengthListArticles = this.articles.length;
			}
		)
	}

	/**
	 * Fetch data channel.
	 * @param idChannel Reference of the channel.
	 */
	onFetchChannelName(idChannel : string) {
		this.channel.getChannelById(idChannel).subscribe(
			(channel : Channel) => {
				this.currentChannel = {
					channelName : channel.channelName,
					channelDescription : channel.channelDescription,
					channelImage : channel.channelImage,
					parentBoard : channel.parentBoard
				}
			}
		)
	}
}
