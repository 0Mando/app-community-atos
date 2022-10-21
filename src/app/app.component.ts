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
}
