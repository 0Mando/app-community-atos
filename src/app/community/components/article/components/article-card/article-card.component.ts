import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-article-card',
	templateUrl: './article-card.component.html',
	styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

	@Input() idArticle : string;
	@Input() userCreatedId : string;
	@Input() date : number;
	@Input() title : string;
	@Input() descriptionContent : string;

	userAuthorData: User = {
		firstName: '',
		lastName: '',
		birthday: '',
		email: '',
		password: '',
		userType: 'normal-user',
		profilePicture: ''
	};

	constructor(private auth : AuthService) { }

	ngOnInit(): void {
		this.onFetchAuthorData(this.userCreatedId);
	}

	/**
	 * Get the information of the author of the article
	 */
	onFetchAuthorData (idUser : string) : void {
		this.auth.onFetchUserInformation(idUser).subscribe(
			(user : User) => {
				this.userAuthorData = {
					firstName: user.firstName,
					lastName: user.lastName,
					birthday: user.birthday,
					email: user.email,
					password: '************',
					userType: user.userType,
					profilePicture: user.profilePicture
				}
			}
		)
	}

}
