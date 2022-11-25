import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel.model';
import { IArticle } from 'src/app/domain/models/ipost';
import { User } from 'src/app/domain/models/user.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-article-page',
	templateUrl: './article-page.component.html',
	styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

	//* Article reference
	idArticle: string = '';
	userAuthorData: User = {
		name: '',
		birthday: '',
		email: '',
		password: '',
		userType: 'normal-user',
		userTypeBackup: 'normal-user',
		profilePicture: ''
	};

	channelData: Channel = {
		channelName: '',
		channelDescription: '',
		channelImage: '',
		parentBoard: '',
	}

	currentArticle: IArticle;
	displayArticle: boolean = false;
	amountComments : number = 0;

	constructor(
		private route: ActivatedRoute,
		private article: ArticleService,
		private auth: AuthService,
		private channel: ChannelService
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
					userCreatedId: article.userCreatedId,
					date: article.date,
					channelId: article.channelId,
					titlePost: article.titlePost,
					descriptionContent: article.descriptionContent,
					content: article.content,
					disableComments: article.disableComments,
					archive: article.archive,
					readingTime: article.readingTime
				}
				this.onFetchChannelData(this.currentArticle.channelId)
				this.onFetchAuthorData(this.currentArticle.userCreatedId)
				this.displayArticle = true;
			}
		)
	}

	/**
	 * Get the user author information to display on article page.
	 * @param idUser Id reference to display user data.
	 */
	onFetchAuthorData(idUser: string): void {
		this.auth.onFetchUserInformation(idUser).subscribe(
			(user) => {
				this.userAuthorData = {...user.payload.data()}
			}
		)
	}

	/**
	 * Get the channel informationto display channel name origin of the article.
	 * @param idChannel Id reference to display channel name.
	 */
	onFetchChannelData(idChannel: string): void {
		this.channel.getChannelById(idChannel).subscribe(
			(channel: Channel) => {
				this.channelData = {
					channelName: channel.channelName,
					channelDescription: channel.channelDescription,
					channelImage: channel.channelImage,
					parentBoard: '',
				}
			}
		)
	}

	/**
	 * Let me here 😳
	 */
	easterEgg(): void {
		console.log('%cHey you found my easter egg🐣',
			'color:yellow; font-size: 8rem;');
	}
}
