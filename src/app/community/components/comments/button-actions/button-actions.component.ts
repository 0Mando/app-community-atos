import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';

@Component({
	selector: 'app-button-actions',
	templateUrl: './button-actions.component.html',
	styleUrls: ['./button-actions.component.scss']
})
export class ButtonActionsComponent implements OnInit {

	showOptionsList : boolean = false;
	commentAuthorId : string = '';
	@Input() canEdit : boolean;
	@Input() canDelete : boolean;
	@Input() canReport : boolean;
	@Input() idCommentReference : string;

	@Output() editComment = new EventEmitter<boolean>();
	@Output() deleteComment = new EventEmitter<boolean>();
	@Output() reportComment = new EventEmitter<boolean>();

	constructor(private commentsService : CommentsService) { }

	ngOnInit(): void {
	}

	onPressedOptions() : void {
		this.showOptionsList = !this.showOptionsList;
	}

	onPressedCover () : void {
		this.showOptionsList = !this.showOptionsList;
	}

	onEdit() : void {
		this.editComment.emit(true);
	}

	onDelete() : void {
		this.commentsService.deleteComment(this.idCommentReference).catch(
			error => console.log('An error ocurred : '+ error)
		)
		alert('Deleting');
	}

	onReport() : void {
		alert('Reporting');
	}

}
