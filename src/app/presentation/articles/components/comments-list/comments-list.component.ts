import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { IComment } from '../../model/icomment';
import { CommentsService } from '../../services/comments.service';

@Component({
	selector: 'app-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

	idPost : string;
	comments : IComment[] = [];
	commentsLength : number = 0;

	canEditComment : boolean;
	canDeleteComment : boolean;
	canReportComment : boolean;

	constructor(
		private commentService : CommentsService,
		private route : ActivatedRoute,
	) {

	}

	ngOnInit(): void {
		this.route.params.subscribe(
			(params : Params) => {
				this.idPost = params['id']
			}
		)

		this.displayListOfComments(this.idPost);
	}

	/**
	 * Display all the comment of a single post.
	 * @param idPost Reference of the post to display comments.
	 */
	displayListOfComments(idPost : string) : void {
		this.commentService.displayComments<IComment>(idPost).subscribe(
			(comments) => {
				this.comments = comments;
				this.commentsLength = this.comments.length;
			}
		)
	}
}
