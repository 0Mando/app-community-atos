import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IComment } from 'src/app/domain/models/icomment';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';

@Component({
	selector: 'app-list-comments',
	templateUrl: './list-comments.component.html',
	styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

	idArticle : string;
	comments : IComment[] = [];
	commentsLength : number = 0;
	@Output() amountComments = new EventEmitter<number>();

	constructor(
		private commentService : CommentsService,
		private route : ActivatedRoute,
		private articleService : ArticleService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params : Params) => {
				this.idArticle = params['id']
			}
		)
		this.onFetchComments(this.idArticle);
	}

	/**
	 * Display all the comment of a single post.
	 * @param idArticle Reference of the post to display comments.
	 */
	onFetchComments(idArticle : string) : void {
		this.commentService.displayComments<IComment>(idArticle).subscribe(
			(comments) => {
				this.comments = comments;
				this.commentsLength = this.comments.length;
				this.articleService.getComments(idArticle, this.commentsLength);
				this.amountComments.emit(this.commentsLength);
			}
		)
	}
}
