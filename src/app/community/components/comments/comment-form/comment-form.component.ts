import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Report } from 'notiflix';
import { IComment } from 'src/app/domain/models/icomment';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';

@Component({
	selector: 'app-comment-form',
	templateUrl: './comment-form.component.html',
	styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

	commentForm: FormGroup;
	currentDate: Date = new Date();
	commentI: IComment;
	idPost: string;
	@Input() replyToAuthor: string;
	counterComments: number = 0;

	currentUser = {
		username: '',
		profilePicture: '',
		role: ''
	};

	private idUser: string;

	constructor(
		private commentsService: CommentsService,
		private authenticationService: AuthService,
		private route: ActivatedRoute
	) {
		this.commentForm = new FormGroup({
			'CommentBody': new FormControl(null, Validators.required)
		})
	}

	ngOnInit(): void {
		this.route.params.subscribe(
			(params: Params) => {
				this.idPost = params['id']
			}
		)
		if(this.userLoggin()) {
			this.idUser = this.authenticationService.currentSessionUserId();
			this.onFetchDataUser();
		}
	}

	userLoggin(): boolean {
		return this.authenticationService.isLoggedIn;
	}

	/**
	 * Get user data.
	 */
	onFetchDataUser(): void {
		this.authenticationService.getUserInformation(this.idUser).subscribe(
			(user: User) => {
				this.currentUser.profilePicture = user.profilePicture;
				this.currentUser.username = user.name;
				this.currentUser.role = user.userType;
				this.counterComments = user.comments || 0;
			}
		)
	}

	/**
	 * Create a new comment in article page.
	 */
	onCreateComment(): void {
		if(this.currentUser.role !== 'disabled'){
			const comment: IComment = {
				idUserAuthor: this.idUser,
				idPost: this.idPost,
				commentBody: this.commentForm.get('CommentBody').value,
				createdAt: this.currentDate.getTime()
			}
			this.commentsService.createComment(comment).catch(
				error => {
					console.log('Something went wrong');
					console.log(error);
				}
			);
			this.authenticationService.updateComments(this.idUser, (this.counterComments + 1)).catch(
				error => console.log('An error ocurred '+error)
			)
			this.commentForm.reset();
		} else {
			this.alertRolePermissions();
			this.commentForm.reset();
		}
	}

	alertRolePermissions() {
		Report.info(
			'Atos Community Upgrade',
			'You do not have permissions to comment an article',
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

	//* Toolbar settings input text for create a post
	editorModules = {
		toolbar: [
			[
				// 'bold',
				// 'italic',
				// 'underline',
				// 'strike'
			],
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
				// { 'color' : [] },
				// { 'background' : [] }
			],
			// [{ 'font' : [] }],
			// [{ 'align' : ['', 'center', 'right', 'justify'] }],

			// ['clean'],

			//* Toolbar multimedia
			[
				// 'link',
				// 'image',
				// 'video'
			]
		]
	}
}
