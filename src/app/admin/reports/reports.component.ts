import { Component, OnInit } from '@angular/core';
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
    console.log(this.reports);
  }

  private getReportsList(){
    this.reportService.getReportList<IReport>().subscribe((reports) => {
			this.reports = [];
			reports.forEach((report) => {
				this.reports.push({
          id: report.payload.doc.id,
          ...report.payload.doc.data(),
        })
				return report;
			});
		});
  }

}
