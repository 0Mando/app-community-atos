import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // users = [1,2,3,4,5,6,7,8];
  users:User[] = [];
  something = true;

  constructor(
    
		private authenticationService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList(){
		this.authenticationService.getUserList<User>().subscribe(
			users =>{
        this.users = users;
				// this.boards = boards;
			}
		)
	}

}
