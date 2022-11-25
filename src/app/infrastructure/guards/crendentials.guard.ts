import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class CrendentialsGuard implements CanActivate {

	constructor(
		private auth : AuthService,
		private router : Router
	) { }

	/**
	 * *If the user is already logged in, he cannot access the sign-in and sign-up pages and is redirected to the boards page, otherwise he can access
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :
	Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.auth.isLoggedIn ? this.router.navigate(['/boards']) : true;
	}
}
