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
}
