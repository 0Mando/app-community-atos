import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  
  users = [1,2,3,4,5,6,7,8];
  something = true;

  constructor() { }

  ngOnInit(): void {
  }

}
