import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
		firstName: '',
		lastName: '',
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

	//* Article page
	currentArticle: IArticle;
	displayArticle: boolean = false;
	amountComments: number = 0;
	displayHeaderButton: boolean;
	editArticle: boolean;

	//* Edit article
	editArticleForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private article: ArticleService,
		private auth: AuthService,
		private channel: ChannelService
	) {

	}

	ngOnInit(): void {
		this.idArticle = this.route.snapshot.params['id'];
		this.displayHeaderButton = this.auth.isLoggedIn;
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
					readingTime: article.readingTime,
					boardId : article.boardId
				}
				this.onFetchChannelData(this.currentArticle.channelId)
				this.onFetchAuthorData(this.currentArticle.userCreatedId)
				this.displayArticle = true;
				this.editArticleForm = new FormGroup({
					'titlePostForm':
						new FormControl(this.currentArticle.titlePost),
					'descriptionContentForm':
						new FormControl(this.currentArticle.descriptionContent),
					'readingTimeForm':
						new FormControl(this.currentArticle.readingTime),
					'contentForm':
						new FormControl(this.currentArticle.content),
					'commentsForm':
						new FormControl(this.currentArticle.disableComments),
					'archiveForm' :
						new FormControl(this.currentArticle.archive)
				})
			}
		)
	}

	/**
	 * Get the user author information to display on article page.
	 * @param idUser Id reference to display user data.
	 */
	onFetchAuthorData(idUser: string): void {
		this.auth.onFetchUserInformation(idUser).subscribe(
			(user: User) => {
				this.userAuthorData = {
					firstName: user.firstName,
					lastName: user.lastName,
					birthday: user.birthday,
					email: user.email,
					password: '************',
					userType: user.userType,
					userTypeBackup: user.userTypeBackup,
					profilePicture: user.profilePicture
				}
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

	onCancelEditArticle(): void {
		this.editArticle = false;
	}

	onUpdateArticle(): void {
		const titlePost = this.editArticleForm.get('titlePostForm').value;
		const descriptionContent = this.editArticleForm.get
			('descriptionContentForm').value;
		const readingTime = this.editArticleForm.get('readingTimeForm').value;
		const content = this.editArticleForm.get('contentForm').value;
		const comments = this.editArticleForm.get('commentsForm').value;
		const archive = this.editArticleForm.get('archiveForm').value;

		this.article.updatePost(this.idArticle, titlePost, descriptionContent,
		readingTime, content, comments, archive).catch(
			error => console.log('An error ocurred '+error)
		)

		this.editArticle = false;
	}

	//* Toolbar settings input text for create a post
	//* If more properties are needed in the editor, just uncomment them.
	editorModules = {
		syntax: true,
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			[
				// 'blockquote',
				'code-block'
			],
			// [{ 'header' : 1 }, { 'header' : 2 }],
			// [{ 'list' : 'ordered' }, { 'list' : 'bullet' }],
			// [{ 'script' : 'sub' }, { 'script' : 'super' }],
			// [{ 'indent' : '-1' }, { 'indent' : '+1' }],
			// [{ 'direction' : 'rtl' }],

			//* Toolbar fontsize stuff
			// [{ 'size' : ['small', false, 'large', 'huge'] }],
			// [{ 'header' : [1,2,3,4,5,6, false] }],

			//* Toolbar font stuff
			[
				{ 'color': [] },
				// { 'background' : [] }
			],
			[{ 'font': [] }],
			[{ 'align': ['', 'center', 'right', 'justify'] }],

			// ['clean'],

			//* Toolbar multimedia
			[
				// 'link',
				'image',
				// 'video'
			]
		]
	}

	/**
	 * Let me here 😳
	 */
	easterEgg(): void {
		console.log('%cHey you found my easter egg🐣',
			'color:yellow; font-size: 8rem;');
	}
}
