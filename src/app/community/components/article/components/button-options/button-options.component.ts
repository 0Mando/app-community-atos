import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IArticle } from 'src/app/domain/models/ipost';
import { IReport } from 'src/app/domain/models/report.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { ReportService } from 'src/app/infrastructure/services/report.service';

@Component({
	selector: 'app-button-options',
	templateUrl: './button-options.component.html',
	styleUrls: ['./button-options.component.scss']
})
export class ButtonOptionsComponent implements OnInit {

	showOptionsList: boolean = false;
	@Input() idArticle: string;
	@Output() editArticle = new EventEmitter<boolean>();

	currentArticle: IArticle = {
		userCreatedId: '',
		date: 0,
		channelId: '',
		titlePost: '',
		descriptionContent: '',
		content: '',
		disableComments: false,
		archive: false,
		readingTime: 0,
	}
	canEditArticle: boolean;
	canReportArticle : boolean;

	constructor(
		private reportService: ReportService,
		private auth: AuthService,
		private articleService: ArticleService,
		private router : Router
	) { }

	ngOnInit(): void {
		this.articleService.getArticleById(this.idArticle).subscribe(
			(article: IArticle) => {
				this.currentArticle = {
					userCreatedId: article.userCreatedId,
					date: article.date,
					channelId: article.channelId,
					titlePost: article.titlePost,
					descriptionContent: article.descriptionContent,
					content: article.content,
					disableComments: article.disableComments,
					archive: article.archive,
					readingTime: article.readingTime
				}
				this.canEditArticle = this.currentArticle.userCreatedId === this.auth.currentSessionUserId();
				this.canReportArticle = this.currentArticle.userCreatedId !== this.auth.currentSessionUserId();
			}
		)
	}

	onPressedOptions(): void {
		this.showOptionsList = !this.showOptionsList;
	}

	onPressedCover(): void {
		this.showOptionsList = !this.showOptionsList;
	}

	/**
	 * Create a new report of an article.
	 */
	onReportArticle(): void {
		const report: IReport = {
			reporterUserId: this.auth.currentSessionUserId(),
			idItemReported: this.idArticle,
			activity: 'Post',
			reportedUserId: this.currentArticle.userCreatedId,
			reportDate: new Date().getTime(),
			status: 'In Review'
		}
		console.table(report);
		this.reportService.createReport(report).catch(
			error => console.log('An error ocurred -> ' + error)
		)
	}

	onEditArticle() : void {
		this.editArticle.emit(true);
	}
}
