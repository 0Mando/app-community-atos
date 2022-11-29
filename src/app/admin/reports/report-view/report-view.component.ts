import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	// reportedId: string = '';
	report;
	// report: IReport = {
	// 	// id? : string;
	// 	reporterUserId: '',
	// 	idItemReported: '',
	// 	activity: 'Comment',
	// 	reportedUserId: '',
	// 	reportDate: 0,
	// 	status: 'In Review',
	// 	reason: '',
	// };

	item: IArticle | IComment;
	article: IArticle;
	comment: IComment;
	// comment: IComment = {
	// 	idUserAuthor: '',
	// 	idPost: '',
	// 	commentBody: '',
	// 	createdAt: 0,
	// };

	constructor(
		private route: ActivatedRoute,
		private reportService: ReportService,
		private articleService: ArticleService,
		private commentService: CommentsService
	) {}

	ngOnInit(): void {
		// console.log(typeof(this.route.snapshot.params['reportId']));
		this.getReportData(this.route.snapshot.params['reportId']);
	}

	getReportData(reportedId) {
		this.reportService
			.getReportById(reportedId)
			.pipe(
				map((reportInput: IReport) => {
					this.report = reportInput;
					return reportInput.idItemReported;
				}),
				switchMap((type) => this.commentService.getCommentById(type))
			)
			.subscribe((comment: IComment) => {
				this.comment = comment;
			});

		this.reportService
			.getReportById(reportedId)
			.pipe(
				map((reportInput: IReport) => {
					this.report = reportInput;
					return reportInput.idItemReported;
				}),
				switchMap((type) => this.articleService.getArticleById(type))
			)
			.subscribe((article: IArticle) => {
				this.article = article;
			});
		// .subscribe((reportInput) => {
		// 	this.report = reportInput;
		// });

		// if (this.report.activity == 'Comment') {
		// 	this.commentService
		// 		.getCommentById(this.report.idItemReported)
		// 		.subscribe((comment: IComment) => {
		// 			this.comment = comment;
		// 		});
		// } else if (this.report.activity == 'Post') {
		// 	this.articleService
		// 		.getArticleById(this.report.idItemReported)
		// 		.subscribe((article: IArticle) => {
		// 			this.item = article;
		// 		});
		// }
	}
}
