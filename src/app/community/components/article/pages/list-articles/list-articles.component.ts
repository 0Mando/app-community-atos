import { first, Subscription, take } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Report } from 'notiflix';
import { Channel } from 'src/app/domain/models/channel.model';
import { IArticle } from 'src/app/domain/models/ipost';
import { User } from 'src/app/domain/models/user.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-list-articles',
	templateUrl: './list-articles.component.html',
	styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit, OnDestroy {

	//* Information of origin
	channelId: string = '';

	//* List of articles
	articles: IArticle[];

	//* Pagination stuff
	lengthListArticles: number = 0;
	page: number = 1;

	currentChannel: Channel = {
		channelName: '',
		channelDescription: '',
		channelImage: '',
		parentBoard: ''
	}

	private userRole: string = '';

	private subArticles: Subscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private article: ArticleService,
		private auth: AuthService,
		private channel: ChannelService
	) { }

	private currentUserId: string;

	ngOnInit(): void {
		// Channel origin
		this.route.params.subscribe(
			(params: Params) => {
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
	userIsLogged(): boolean {
		return this.auth.isLoggedIn;
	}

	isVerified(): boolean {
		return true;
	}

	/**
	 * Redirect to the create article page if you are registered and verified.
	 */
	onCreateArticle() {
		//* Get user role
		if (this.userIsLogged()) {
			this.currentUserId = this.auth.currentSessionUserId();
			this.auth.getUserInformation(this.currentUserId).pipe(take(1)).subscribe(
				(user: User) => {
					this.userRole = user.userType;
					//* Permissions
					if (this.userIsLogged() && this.isVerified() && this.userRole !== 'disabled') {
						this.router.navigate(['create-article'],
							{ queryParams: { channelId: this.channelId } });
					} else if (this.userIsLogged() && this.userRole === 'disabled') {
						this.alertRolePermissions();
					} else if(!user){
						alert('Please login');
					}
				}
			)
		}
	}

	/**
	 * Fetch the articles from the channel.
	 */
	onFetchArticles() {
		this.subArticles = this.article.displayPost<IArticle>(this.channelId).pipe(take(1)).subscribe(
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
	onFetchChannelName(idChannel: string) {
		this.channel.getChannelById(idChannel).subscribe(
			(channel: Channel) => {
				this.currentChannel = {
					channelName: channel.channelName,
					channelDescription: channel.channelDescription,
					channelImage: channel.channelImage,
					parentBoard: channel.parentBoard
				}
			}
		)
	}

	ngOnDestroy(): void {
		this.subArticles.unsubscribe();
	}

	alertRolePermissions() {
		Report.info(
			'Atos Community Upgrade',
			'You do not have permissions to create an article',
			'Okay',
			() => { },
			{
				svgSize: '42px',
				messageMaxLength: 1923,
				plainText: false,
				info: {
					svgColor: '#0195ff',
					titleColor: '#1e1e1e',
					messageColor: '#242424',
					buttonBackground: '#0195ff',
					buttonColor: '#fff',
					backOverlayColor: 'rgba(1,149,255,0.2)',
				},
			}
		)
	}
}
