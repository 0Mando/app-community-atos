import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { IArticle } from 'src/app/domain/models/ipost';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { Location } from '@angular/common';
import { ArticleCanDeactivate } from 'src/app/infrastructure/services/article-guard.service';
import { Observable } from 'rxjs';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';


@Component({
	selector: 'app-create-article',
	templateUrl: './create-article.component.html',
	styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit, ArticleCanDeactivate {

	// TODO : Refactorizar campos para crear un artículo
	post: IArticle;

	//* Create an article form
	markdownForm: FormGroup;
	titlePost: string;
	currentDate: Date = new Date();
	descriptionContent: string;
	readingTime: number;
	quilleditorContent: string;
	comments: boolean;
	archiveArticle: boolean = false;
	articleChangesSaved: boolean = false;

	//* Parameters
	channelParentParam: string = '';
	boardParam: string = '';

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

	constructor(
		private authenticationService: AuthService,
		private articleService: ArticleService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {
		this.markdownForm = new FormGroup({
			'titlePostForm': new FormControl(null, Validators.required),
			'descriptionContentForm': new FormControl(null, Validators.required),
			'readingTimeForm': new FormControl(null, Validators.required),
			'contentForm': new FormControl(null, Validators.required),
			'comments': new FormControl(true, Validators.required)
		})
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe(
			(params: Params) => {
				this.channelParentParam = params['channel']
				this.boardParam = params['board']
			}
		)
	}

	submitPost(): void {
		this.post = {
			userCreatedId: this.authenticationService.currentSessionUserId(),
			date: this.currentDate.getTime(),
			channelId: '',
			titlePost: this.markdownForm.get('titlePostForm').value,
			descriptionContent: this.markdownForm.get('descriptionContentForm').value,
			content: this.markdownForm.get('contentForm').value,
			disableComments: this.markdownForm.get('comments').value,
			archive: this.archiveArticle,
			readingTime: this.markdownForm.get('readingTimeForm').value,
			boardParent: this.boardParam
		}
		console.table(this.post);

		// this.articleService.createPost(this.post).catch(
		// 	error => console.log('An error ocurred : ' + error)
		// )
		this.articleChangesSaved = true;

		// this.router.navigate(['/articles/'+ this.boardParam + '/' + this.channelParentParam +'/posts']);
		// this.markdownForm.reset();
	}

	/**
	 * Archive the current article.
	 */
	onSaveDraft(): boolean {
		return this.archiveArticle = true;
	}

	/**
	 * Go back to list articles page
	 */
	onCancelArticle(): void {
		this.location.back();
	}

	/**
	 * Show the preview content of the post
	 * @param event Change on the quill editor
	 */
	changeEditor(event: EditorChangeContent | EditorChangeSelection) {
		this.quilleditorContent = event['editor']['root']['innerHTML'];
		this.titlePost = this.markdownForm.get('titlePostForm').value;
		// this.article.date = this.markdownForm.get('currentDateForm').value;
	}

	canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.markdownForm.valid) {
			return  confirm(
			`Are you sure you want to leave this page?\nYou can save this draft and continue later`
			);
		} else {
			return false;
		}
	}
}
