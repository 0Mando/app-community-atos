import { trigger } from '@angular/animations';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IArticle } from 'src/app/domain/models/ipost';
import { User } from 'src/app/domain/models/user.model';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	skills: string[] = []
	posts: IArticle[] = [];
	private userId: string = '';
	page: number = 1;

	name: string = '';

	following: boolean = true;
	verified: boolean = false;

	pfp: string = '';
	bg: string = '';

	constructor(
		private _articleService: ArticleService,
		private route: ActivatedRoute,
		private _auth: AuthService
	) { }

	ngOnInit(): void {

		this.route.params.subscribe(
			(params: Params) => {
				this.userId = params['userId']
				this.fetchUserArticles(this.userId);
				this.fetchUserData(this.userId);
			}
		)
		let btn = document.querySelector('.follow__btn')! as HTMLButtonElement;
		let check = document.querySelector('.profile__image-check')! as HTMLSpanElement;
		let verify = document.querySelector('.profile__actions-verify')! as HTMLButtonElement;

		if (this.following) {
			btn.classList.add('following');
			btn.textContent = 'Following';
		} else {
			btn.classList.remove('following');
			btn.textContent = 'Follow';
		}

		if (this.verified) {
			// img.classList.add('verified');
			check.style.background = '#55be75';
			verify.style.display = "none";
		}
	}

	follow(): void {
		let btn = document.querySelector('.follow__btn')! as HTMLButtonElement;
		btn.classList.toggle('following');

		if (this.following) {
			btn.textContent = "Follow";
		} else {
			btn.textContent = "Following";
		}

		this.following = !this.following;
	}

	/**
	 * Gets the user´s profile articles list.
	 * @param userId User ID reference.
	 */
	private fetchUserArticles(userId: string) {
		this._articleService.onFetchUserArticles<IArticle>(userId).subscribe(
			(articles) => {
				this.posts = articles;
			}
		)
	}

	/**
	 * Gets the user's profile skills list.
	 * @param userId User ID reference.
	 */
	private fetchUserData(userId: string) {
		this._auth.getUserInformation(userId).subscribe(
			(user: User) => {
				this.skills = user.skills;
				this.name = user.name;
				this.pfp = user.profilePicture;
				this.bg = user.bannerImage;
			}
		)
	}
}
