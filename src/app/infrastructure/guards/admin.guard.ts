import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  userId: string;

  constructor(private _authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.getUserID();
    
    return true;
  }

  getUserID(){
    const uid = this._authService.userID$.pipe(
      filter(res => res != undefined)
      );

    const sub = uid.subscribe(data => {
      console.log('the user id is ' + data);
    })
  }

  verify(){
    console.log(this.userId);
    
    return true;
  }
  
}
