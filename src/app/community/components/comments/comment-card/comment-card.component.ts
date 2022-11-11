import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-comment-card',
	templateUrl: './comment-card.component.html',
	styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

	canEditComment: boolean;
	canDeleteComment: boolean;
	canReportComment: boolean;

	@Input() idAuthorComment: string;
	@Input() createdAt: number;
	@Input() commentBody: string;

	userAuthorData: User = {
		firstName: '',
		lastName: '',
		birthday: '',
		email: '',
		password: '',
		userType: 'normal-user',
		profilePicture: ''
	};

	commentEditForm: FormGroup;

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
		private authenticationService: AuthService
	) {
		this.commentEditForm = new FormGroup({
			'CommentBody': new FormControl(this.commentBody)
		})
	}

	ngOnInit(): void {
		this.onFetchDataUser(this.idAuthorComment);
	}

	/**
	 * Hide button of options if user isn´t register.
	 * @returns If user is register or not.
	 */
	userNoRegister(): boolean {
		return this.authenticationService.isLoggedIn;
	}

	editComment(idAuthorComment: string): boolean {
		return this.authenticationService.currentSessionUserId() === idAuthorComment;
	}

	deleteComment(idAuthorComment: string): boolean {
		return this.authenticationService.currentSessionUserId() === idAuthorComment;
	}

	reportComment(idAuthorComment: string): boolean {
		return this.authenticationService.currentSessionUserId() !== idAuthorComment;
	}

	onEditComment() {
		return this.commentEditForm.get('CommentBody').value;
	}

	onFetchDataUser(idUser: string) {
		this.authenticationService.onFetchUserInformation(idUser).subscribe(
			(user: User) => {
				this.userAuthorData = {
					firstName: user.firstName,
					lastName: user.lastName,
					birthday: user.birthday,
					email: user.email,
					password: '************',
					userType: user.userType,
					profilePicture: user.profilePicture
				}
			}
		)
	}

}
