import { Component, Input, OnInit } from '@angular/core';
import { Confirm, Report } from 'notiflix';
import { IArticle } from 'src/app/domain/models/ipost';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-likes',
	templateUrl: './likes.component.html',
	styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

	@Input() counter: number;
	classNameLikeButton: string = 'likes__heart';
	@Input() referenceArticleId: string;

	constructor(
		private auth: AuthService,
		private articleService: ArticleService
	) { }

	ngOnInit(): void {
		this.articleService.getArticleById<IArticle>(this.referenceArticleId)
			.subscribe(
				(article: IArticle) => {
					if (this.auth.isLoggedIn) {
						this.classNameLikeButton = article.likes.includes(
							this.auth.currentSessionUserId()
						) ? 'likes__active' : 'likes__heart'
					}
				}
			)
	}

	onToggleLikeButton() {
		if (this.classNameLikeButton === 'likes__heart') {
			if (!this.auth.isLoggedIn) {
				this.alertToLogIn();
			} else {
				this.articleService.addLike(
					this.referenceArticleId,
					this.auth.currentSessionUserId()
				).catch(
					error => console.log('An error ocurred ' + error
					)
				)
			}
		} else {
			this.articleService.removeLike(
				this.referenceArticleId,
				this.auth.currentSessionUserId()
			).catch(
				error => console.log('An error ocurred :'+error)
			)
		}
	}

	alertToLogIn() {
		Report.info(
			'Atos Community Upgrade',
			'Please register or log in to like the articles',
			'Okay',
			() => { },
			{
				svgSize: '42px',
				messageMaxLength: 1923,
				plainText: false,
				info: {
					svgColor: '#0195ff',
					titleColor: '#1e1e1e',
					messageColor: '#242424',
					buttonBackground: '#0195ff',
					buttonColor: '#fff',
					backOverlayColor: 'rgba(1,149,255,0.2)',
				},
			}
		)
	}
}
