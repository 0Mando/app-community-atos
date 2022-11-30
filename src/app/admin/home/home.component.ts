import { map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
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

  myUser;

  constructor(
    private _reportService: ReportService,
    private _authService: AuthService) { }

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

    this._authService.getCurrentUser().pipe(
      map(data => {
        return data.uid
      }),
      switchMap(data => this._authService.onFetchUserInformation(data))
    ).subscribe(user => {
      this.myUser = {...user.payload.data()}
    })
  }

}
