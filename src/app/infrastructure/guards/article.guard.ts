import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class ArticleGuard implements CanActivate {

	constructor(
		private auth : AuthService,
		private router : Router
	) {}

	/**
	 * *If user is logged in can create a new article, else redirect to sign in page.
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
	Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.auth.isLoggedIn ? true : this.router.navigate(['/sign-in'])
	}

}
