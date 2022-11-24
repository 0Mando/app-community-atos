import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface ArticleCanDeactivate {
	canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
	providedIn: 'root'
})
export class ArticleGuardService implements CanDeactivate<ArticleCanDeactivate> {

	constructor() { }
	canDeactivate(
		component: ArticleCanDeactivate, currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot):
		boolean | UrlTree | Observable<boolean | UrlTree> |
		Promise<boolean | UrlTree> {
		return component.canDeactivate();
	}
}
