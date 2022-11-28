import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

	@Input() userId: string;
	@Input() date : number;
	userProfilePicture : string;
	userName : string;

	constructor(private auth : AuthService) { }

	ngOnInit(): void {
		this.onFetchUserData(this.userId);
	}

	onFetchUserData(userId: string) {
		this.auth.getUserInformation(userId).subscribe(
			(user : User) => {
				this.userProfilePicture = user.profilePicture;
				this.userName = user.name;
			}
		)
	}

}
