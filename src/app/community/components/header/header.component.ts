import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {
	// export class HeaderComponent implements OnInit, DoCheck {

	currentUser: User = {
		firstName: '',
		lastName: '',
		birthday: '',
		email: '',
		password: '',
		profilePicture: '',
		userType: 'normal-user',
		userTypeBackup: 'normal-user'
	};

	private subscription : Subscription;

	boards: string[] = [
		'Board 1',
		'Board 2',
		'Board 3',
		'Board 4',
		'Board 5'
	];
	profiles: string[] = [
		'Profile 1',
		'Profile 2',
		'Profile 3'
	];
	loggedIn : boolean;

	constructor(
		private authenticationService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.loggedIn = this.authenticationService.isLoggedIn;
		console.log('%cCONSTRUCTOR', 'color:#ff3b66; font-size: 1rem;');
		console.log('%cIs logged in -> ' + this.authenticationService.isLoggedIn, 'color:#ff3b66; font-size: 1rem;');
	}

	ngOnInit(): void {
		console.log('%c*** INIT ***', 'color:blue; font-size: 1rem;');
		console.log('%c***Is logged in *** '+this.loggedIn, 'color:blue; font-size: 1rem;');
		if(this.loggedIn) {
			this.fetchUserData();
		}
	}

	ngDoCheck(): void {
		this.loggedIn = this.authenticationService.isLoggedIn;
	}

	ngOnDestroy(): void {
		console.log('%c*** DESTROY ***', 'color:red; font-size: 1rem;');
		if(this.loggedIn) {
			this.subscription.closed;
			this.loggedIn = false;
		}
	}

	toggleMenu(): void {
		let menu = document.querySelector('.header')!;
		menu.classList.toggle('active-menu');
	}

	iconToggleMenu(): void {
		let menu = document.querySelector('.header')!;
		menu.classList.remove('active-menu');
	}

	onLogout(): void {
		this.authenticationService.logout();
		this.loggedIn = this.authenticationService.isLoggedIn;
		this.router.navigate(['sign-in']);
	}

	/**
	 * Get the information of the current user in the session.
	 * @param idUser
	 */
	fetchUserData() {
		const idUser = this.authenticationService.currentSessionUserId();
		this.subscription = this.authenticationService.onFetchUserInformation(idUser).subscribe(
			(user: User) => {
				this.currentUser = {
					firstName: user.firstName,
					lastName: user.lastName,
					birthday: user.birthday,
					email: user.email,
					password: '************',
					userType: user.userType,
					userTypeBackup: user.userTypeBackup,
					profilePicture: user.profilePicture
				}
			}
		)
	}
}
