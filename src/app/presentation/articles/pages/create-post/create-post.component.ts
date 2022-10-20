import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { IPost } from '../../model/ipost';
import { ArticleService } from '../../services/article.service';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

	markdownForm: FormGroup;
	quilleditorContent : string;
	currentDate : Date = new Date();
	previewArticle = { title : '' }
	post : IPost;
	currentUser = { firtsName : '', lastName : '' }
	channelParentParam : string = '';

	constructor(
		private authenticationService : AuthService,
		private articleService : ArticleService,
		private route : ActivatedRoute,
		private router : Router
	) {
		this.markdownForm = new FormGroup({
			'titlePostForm' : new FormControl(null, Validators.required),
			'currentDateForm' : new FormControl(this.currentDate),
			'mdeInput': new FormControl(null, Validators.required)
		})
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe(
			(params : Params) => {
				this.channelParentParam = params['channel']
			}
		)
	}

	submitPost() : void {
		// *Get the user's first and last name
		this.authenticationService.getUserById<User>().subscribe(
			user => {
				this.post = {
					'title' : this.markdownForm.get('titlePostForm').value,
					'date' : this.markdownForm.get('currentDateForm').value,
					'content' : this.markdownForm.get('mdeInput').value,
					'firstName' : this.currentUser.firtsName = user.firstName,
					'lastName' : this.currentUser.lastName = user.lastName,
					'channelParent' : this.channelParentParam
				}

				//* Submit the content of the post
				this.articleService.createPost(this.post).catch(
					error => {
						console.log('An error ocurred -> '+error);
					}
				)

				this.router.navigate(['/boards']);
				this.markdownForm.reset();
			}
		)
	}

	/**
	 * Show the preview content of the post
	 * @param event Change on the quill editor
	 */
	changeEditor(event: EditorChangeContent | EditorChangeSelection){
		this.quilleditorContent = event['editor']['root']['innerHTML'];
		this.previewArticle.title = this.markdownForm.get('titlePostForm').value;
		// this.article.date = this.markdownForm.get('currentDateForm').value;
	}

	//* Toolbar settings input text for create a post
	editorModules = {
		toolbar : [
			['bold','italic','underline','strike'],
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
				{ 'color' : [] },
				// { 'background' : [] }
			],
			[{ 'font' : [] }],
			[{ 'align' : ['', 'center', 'right', 'justify'] }],

			// ['clean'],

			//* Toolbar multimedia
			[
				// 'link',
				'image',
				// 'video'
			]
		]
	}
}
