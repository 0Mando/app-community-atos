import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = [1,2,3,4,5,6,7,8];
  something = true;

  constructor() { }

  ngOnInit(): void {
  }

}
