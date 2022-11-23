import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IReport } from 'src/app/domain/models/report.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { ReportService } from 'src/app/infrastructure/services/report.service';
import { UsersService } from 'src/app/infrastructure/services/users.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  
  users = [1,2,3,4,5,6,7,8];
  something = true;
  reports:IReport[] = [];

  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getReportsList();
  }

  private getReportsList(){
    this.reportService.getReportList().subscribe((reports) => {
			this.reports = [];
			reports.forEach((report) => {
        console.log(this.authService.onFetchUserInformation(report.reporterUserId))
        this.reports.push({
          id: report.id,
          // reporterName: this.userService.getUser(report.reporterUserId),
          ...report,
        })
				return report;
			});
		});
  }

}
