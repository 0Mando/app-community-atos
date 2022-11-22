import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IReport } from 'src/app/domain/models/report.model';
import { ReportService } from 'src/app/infrastructure/services/report.service';

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
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.getReportsList();
  }

  private getReportsList(){
    this.reportService.getReportList().subscribe((reports) => {
			this.reports = [];
			reports.forEach((report) => {
				this.reports.push({
          id: report.id,
          ...report,
        })
				return report;
			});
		});
  }

}
