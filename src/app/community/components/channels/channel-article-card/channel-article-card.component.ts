import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/domain/models/ipost';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-channel-article-card',
	templateUrl: './channel-article-card.component.html',
	styleUrls: ['./channel-article-card.component.scss']
})
export class ChannelArticleCardComponent implements OnInit {

	@Input() article : IArticle;
	profilePicture : string = '';
	titlePost : string = '';
	descriptionPost : string = '';
	id: string;

	constructor(private auth : AuthService) { }

	ngOnInit(): void {
		this.onFetchUserProfilePicture(this.article.userCreatedId);
		
		this.titlePost = this.article.titlePost;
		this.descriptionPost = this.article.descriptionContent;
		this.id = this.article.id;
		
	}

	onFetchUserProfilePicture(authorId: string) {
		this.auth.onFetchUserInformation(authorId).subscribe(
			(user) => {
				this.profilePicture = user.payload.data().profilePicture;
				
			}
		)
	}
}
