import { ReportService } from 'src/app/infrastructure/services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  reports = [];
  articleReport = [];
  commentReport = [];
  page : number = 1;

  constructor(private _reportService: ReportService) { }

  ngOnInit(): void {
    this.reports = [];
    this.articleReport = [];
    this.commentReport = [];

    this._reportService.readReportsByType().subscribe(data => {
      data.forEach(x => {
        this.reports.push(x.payload.doc.data());
      })

      this.reports.forEach(y => {
        if(y.activity === 'Post'){
          this.articleReport.push(y);
        } else if(y.activity === 'Comment'){
          this.commentReport.push(y);
        }
      })
    });
  }

}
