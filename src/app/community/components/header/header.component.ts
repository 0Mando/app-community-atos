import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map, switchMap, filter, Observable, last, mergeMap } from 'rxjs';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	currentUser: User;

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

	loggedIn = false;
	userData: User;

	constructor(private authenticationService: AuthService, private router : Router) {}

	ngOnInit(): void {
		this.authenticationService.isUserLogged.pipe(
			map(data => {
				this.currentUser = undefined;
				this.loggedIn = data;
			}),
			switchMap(data => this.authenticationService.getCurrentUser().pipe(
				map(user => {
					if(user){
						return user.uid;
					}
				})
			)),
			switchMap(data => this.authenticationService.onFetchUserInformation(data).pipe(
				map(data => {
					this.currentUser = {
						...data.payload.data()
					}
				})
			))
		).subscribe()
	}

	toggleMenu(): void {
		let menu = document.querySelector('.header')!;
		menu.classList.toggle('active-menu');
	}

	iconToggleMenu(): void {
		let menu = document.querySelector('.header')!;
		menu.classList.remove('active-menu');
	}

	onLogout(): void{
		this.authenticationService.logout();
		this.router.navigate(['sign-in']);
	}

	/**
	 * Get the information of the current user in the session.
	 * @param idUser
	 */
	fetchUserData(idUser : string){
		this.authenticationService.onFetchUserInformation(idUser).subscribe(
			(user: User) => {
				this.currentUser = {
					firstName: user.firstName,
					lastName: user.lastName,
					birthday: user.birthday,
					email: user.email,
					password: '************',
					userType : user.userType,
					userTypeBackup : user.userTypeBackup,
					profilePicture : user.profilePicture
				}
			}
		)
	}
}
