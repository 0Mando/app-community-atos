import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

	mdeForm: FormGroup;
	editorContent : string;
	currentDate : Date = new Date();
	post = { title : '', date : '' }

	constructor() {
		this.mdeForm = new FormGroup({
			'titlePostForm' : new FormControl(null, Validators.required),
			'currentDateForm' : new FormControl(null),
			'mdeInput': new FormControl(null, Validators.required)
		})
	}

	ngOnInit(): void {
	}

	onSubmitPost() {
		console.log(this.mdeForm.get('titlePostForm').value);
		console.log(this.mdeForm.get('currentDateForm').value);
		console.log(this.mdeForm.get('mdeInput').value);
	}

	/**
	 * Show the preview content of the post
	 * @param event Change on the quill editor
	 */
	changeEditor(event: EditorChangeContent | EditorChangeSelection){
		this.editorContent = event['editor']['root']['innerHTML'];
		this.post.title = this.mdeForm.get('titlePostForm').value;
		this.post.date = this.mdeForm.get('currentDateForm').value;
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
