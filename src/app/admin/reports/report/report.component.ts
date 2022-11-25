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

	reportedPhoto:string = '';
	reporterPhoto:string = '';

	constructor(private auth: AuthService) {}

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
}
