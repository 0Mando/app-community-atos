import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventProfileGuard implements CanActivate {

	currentUserId: string;

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
		return this.auth.getCurrentUser().pipe(
			map(userId => {
				if(userId.uid === route.params['userId']) {
					this.router.navigate(['myprofile'])
					return false;
				} else {
					return true;
				}
			})
		)
	}
}
