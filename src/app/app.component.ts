import { Router, NavigationStart } from '@angular/router';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app-community-atos';

	show: boolean = false;

	constructor(private router: Router){
		router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				if (event['url'].includes('/admin')){
					this.show = false;
				} else {
					this.show = true;
				}
			}
		})
	}

	/**
	 * Hide the navigation bar if you are on the sign-in and sign-up paths.
	 * @returns The current route is different from sign in and sign up.
	 */
	currentPage() : boolean {
		return this.router.url !== '/sign-in' && this.router.url !== '/sign-up';
	}
}
