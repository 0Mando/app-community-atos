import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
	// displayMenuActions : boolean = true;
	otherPlace : boolean = true;

	constructor(
		private commentService : CommentsService,
		private route : ActivatedRoute
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

	displayListOfComments(idPost : string) : void {
		this.commentService.displayComments<IComment>(idPost).subscribe(
			(comments) => {
				this.comments = comments;
				this.commentsLength = this.comments.length;
			}
		)
	}
}