import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, lastValueFrom, filter, switchMap, map, take, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  currentUserId: string;

  constructor(private _authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this._authService.isLoggedIn){
      this.router.navigate(['/'])
      return false
    }

    return this._authService.getCurrentUser().pipe(
      switchMap(user => this._authService.getAdmins().pipe(
        map(admins => {
          let isAdmin: boolean;
          admins.forEach(admin => {
            if(user.uid === admin.id){
              isAdmin = true;
            }
          })
          if(isAdmin){
            return true;
          }
          this.router.navigate(['/'])
          return false;
        })
      ))
    );
  }
}
