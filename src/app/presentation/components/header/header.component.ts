import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

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

	constructor(private authenticationService: AuthService, private router : Router) {
		this.loggedIn = this.authenticationService.isLoggedIn;
	}

	ngDoCheck(): void {
		this.loggedIn = this.authenticationService.isLoggedIn;
	}

	ngOnInit(): void {

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
		this.loggedIn = this.authenticationService.isLoggedIn;
		this.router.navigate(['sign-in']);
	}
}
