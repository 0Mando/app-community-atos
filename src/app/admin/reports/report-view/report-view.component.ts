import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, switchMap } from 'rxjs';
import { IComment } from 'src/app/domain/models/icomment';
import { IArticle } from 'src/app/domain/models/ipost';
import { IReport } from 'src/app/domain/models/report.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';
import { ReportService } from 'src/app/infrastructure/services/report.service';

@Component({
	selector: 'app-report-view',
	templateUrl: './report-view.component.html',
	styleUrls: ['./report-view.component.scss'],
})
export class ReportViewComponent implements OnInit {
	report: IReport;
	article: IArticle;
	comment: IComment;


	constructor(
		private route: ActivatedRoute,
		private reportService: ReportService,
		private articleService: ArticleService,
		private commentService: CommentsService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getReportData(this.route.snapshot.params['reportId']);
	}

	getReportData(reportedId) {
		this.reportService.getReportById(reportedId).pipe(
			map((reportInput: IReport) => {
				this.report = reportInput;
				return reportInput;
			}),
			switchMap((type) => {
				if(type.activity === 'Comment'){
					return this.commentService.getCommentById(type.idItemReported).pipe(
						map((data: IComment) => {
							this.comment = data
						})
					)
				} else if (type.activity === 'Post'){
					return this.articleService.getArticleById(type.idItemReported).pipe(
						map((data: IArticle) => {
							this.article = data
						})
					)
				}
			})
		).subscribe();
	}

	removeReportHandler(){
		this.reportService.deleteReport(this.route.snapshot.params['reportId']);
		this.router.navigate(['admin/reports']);
	}

	deleteCommentHandler(commentId){
		this.commentService.deleteComment(commentId);
		this.removeReportHandler();
	}
	
	deleteArticleHandler(articleId){
		this.articleService.deletePost(articleId);
		this.removeReportHandler();
	}
}
