import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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

	currentUser: User = {
		firstName: '',
		lastName: '',
		birthday: '',
		email: '',
		password: '',
		userType: 'normal-user',
		userTypeBackup: 'normal-user',
		profilePicture: ''
	};

	private idUser: string = this.authenticationService.currentSessionUserId();

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
		this.onFetchDataUser();
	}

	/**
	 * Get user data.
	 */
	onFetchDataUser(): void {
		this.authenticationService.onFetchUserInformation(this.idUser).subscribe(
			(user: User) => {
				this.currentUser = {
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
	 * Create a new comment in article page.
	 */
	onCreateComment(): void {
		const comment: IComment = {
			idUserAuthor: this.idUser,
			idPost: this.idPost,
			commentBody: this.commentForm.get('CommentBody').value,
			createdAt: this.currentDate.getTime()
		}
		console.table(comment);
		this.commentsService.createComment(this.commentI)
			.catch(
				error => {
					console.log('Something went wrong');
					console.log(error);
				}
			);
		this.commentForm.reset();
	}
}
