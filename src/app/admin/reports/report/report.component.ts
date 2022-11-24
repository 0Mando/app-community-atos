import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
	@Input() report;

	reportedName: string = '';
	reporterName: string = '';

	constructor(private auth: AuthService) {}

	ngOnInit(): void {
		this.onFetchAuthorData(
			this.report.reportedUserId,
			this.report.reporterUserId
		);
	}

	onFetchAuthorData(reportedId: string, reporterId: string): void {
		this.auth.onFetchUserInformation(reportedId).subscribe((user: User) => {
			this.reportedName = user.firstName + " " + user.lastName;
		});
		this.auth.onFetchUserInformation(reporterId).subscribe((user: User) => {
			this.reporterName = user.firstName + " " + user.lastName;
		});
	}
}
