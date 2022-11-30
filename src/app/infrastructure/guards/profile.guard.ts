import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

	constructor(
		private auth: AuthService,
		private router: Router
	) { }

	/**
	 * If the user is logged in and the userId parameter is equal to that of the
	 * current user then navigate to the myprofile page otherwise access the profile
	 * of the selected user.
	 * @param route Gets the userId parameter.
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
	Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.auth.isLoggedIn &&
			route.params['userId'] === this.auth.currentSessionUserId() ?
				this.router.navigate(['myprofile']) : true;
	}
}
