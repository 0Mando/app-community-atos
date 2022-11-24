import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/domain/models/icomment';
import { IReport } from 'src/app/domain/models/report.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';
import { ReportService } from 'src/app/infrastructure/services/report.service';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

@Component({
	selector: 'app-button-actions',
	templateUrl: './button-actions.component.html',
	styleUrls: ['./button-actions.component.scss']
})
export class ButtonActionsComponent implements OnInit {

	showOptionsList: boolean = false;
	commentAuthorId: string = '';
	@Input() canEdit: boolean;
	@Input() canDelete: boolean;
	@Input() canReport: boolean;
	@Input() idCommentReference: string;

	@Output() editComment = new EventEmitter<boolean>();
	@Output() deleteComment = new EventEmitter<boolean>();
	@Output() reportComment = new EventEmitter<boolean>();

	currentComment: IComment = {
		idUserAuthor: '',
		idPost: '',
		commentBody: '',
		createdAt: 0
	}

	constructor(
		private commentsService: CommentsService,
		private reportService: ReportService,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		this.commentsService.getCommentById(this.idCommentReference).subscribe(
			(comment: IComment) => {
				this.currentComment = {
					idUserAuthor: comment.idUserAuthor,
					idPost: comment.idPost,
					commentBody: comment.commentBody,
					createdAt: comment.createdAt
				}
			}
		)
	}

	onPressedOptions(): void {
		this.showOptionsList = !this.showOptionsList;
	}

	onPressedCover(): void {
		this.showOptionsList = !this.showOptionsList;
	}

	onEdit(): void {
		this.editComment.emit(true);
	}

	onDelete(): void {
		this.commentsService.deleteComment(this.idCommentReference).catch(
			error => console.log('An error ocurred : ' + error)
		)
		alert('Deleting');
	}

	onReport(): void {
		Confirm.prompt(
			'Report reason',
			'Write the reason for the report',
			'Inappropriate message',
			'Submit report',
			'Cancel',
			(clientAnswer) => {
				const report : IReport = {
					reporterUserId : this.authService.currentSessionUserId(),
					idItemReported : this.idCommentReference,
					activity : 'Comment',
					reportedUserId : this.currentComment.idUserAuthor,
					reportDate : new Date().getTime(),
					status : 'In Review',
					reason : clientAnswer
				}
				this.reportService.createReport(report).catch(
					error => console.log('An error ocurred : ' + error)
				)
			}
		)
	}
}
