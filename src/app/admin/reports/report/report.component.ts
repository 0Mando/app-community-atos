import { Component, Input, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Confirm } from 'notiflix';
import { IComment } from 'src/app/domain/models/icomment';
import { IArticle } from 'src/app/domain/models/ipost';
import { IReport } from 'src/app/domain/models/report.model';
import { User } from 'src/app/domain/models/user.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { CommentsService } from 'src/app/infrastructure/services/comments.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
	@Input() report;
	
	reportedName: string = '';
	reporterName: string = '';
	
	reportedPhoto: string = '';
	reporterPhoto: string = '';
	
	reportedContent:string  = '';
	reportedUrl:string  = '';
	reportedItemId:string = '';
	message:string = '';

	constructor(
		private auth: AuthService,
		private commentsService: CommentsService,
		private articleService: ArticleService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.onFetchAuthorData(
			this.report.reportedUserId,
			this.report.reporterUserId
		);
	}

	onFetchAuthorData(reportedId: string, reporterId: string): void {
		this.auth.onFetchUserInformation(reportedId).subscribe((user) => {
			this.reportedName = user.payload.data().name;
			this.reportedPhoto = user.payload.data().profilePicture;
		});
		this.auth.onFetchUserInformation(reporterId).subscribe((user) => {
			this.reporterName = user.payload.data().name;
			this.reporterPhoto = user.payload.data().profilePicture;
		});
	}

	actOnReport(report): void {
		let reportedItem = report.id;
		// this.getReportUrl(report.activity, reportedItem).then((value)=>{
		// 	let aux = value;
		// 	this.reportedUrl = aux;
		// });

		
		Notiflix.Confirm.show(
			'Reported ' + report.activity.toLowerCase(),
			'Reason of report: ' + (report.reason ? report.reason  : 'No reason was submitted'),
			'Take action',
			'Cancel',
			() => {
				this.router.navigate(['admin/report/'+reportedItem]);
			},
			function cancelCb() {
				Notiflix.Notify.warning('Action Cancelled', {
					timeout: 2000,
				});
			},
			{
				width: '400px',
				borderRadius: '8px',
				titleColor: '#0195ff',
				okButtonBackground: '#0195ff',
			}
		);
	}
}
