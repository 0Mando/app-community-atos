import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-top-speakers',
	templateUrl: './top-speakers.component.html',
	styleUrls: ['./top-speakers.component.scss']
})
export class TopSpeakersComponent implements OnInit {

	articles = [1,2,3,4,5,6]

	topSpeaker: User[] = [];

	constructor(private auth: AuthService) { }

	ngOnInit(): void {
		this.onFetchTopSpeakers();
	}

	onFetchTopSpeakers() {
		this.auth.getTopSpeakers().subscribe(
			(user) => {
				this.topSpeaker = user;
			}
		)
	}

}
