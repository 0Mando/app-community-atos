import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IReport } from 'src/app/domain/models/report.model';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { ReportService } from 'src/app/infrastructure/services/report.service';

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
	reports: IReport[] = [];
	fullName: string = '';

	constructor(
		private reportService: ReportService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.getReportsList();
	}

	private getReportsList() {
		this.reportService.getReportList().subscribe((reports) => {
			this.reports = [];
			console.log(this.reports);
			reports.forEach((report) => {
				this.reports.push({
					id: report.id,
					reportedName: this.authService.onFetchUserInformation(
						report.reportedUserId
					),
					reporterName: this.onFetchUserData(report.reporterUserId),
					...report,
				});
				return report;
			});
			console.log(this.reports);
		});
	}

	async onFetchUserData(idUser: string) {
		await this.authService
			.onFetchUserInformation(idUser)
			.subscribe((user: User) => {
				this.fullName = user.name;
			});
	}
}
