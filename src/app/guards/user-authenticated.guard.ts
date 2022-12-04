import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs'; 
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true/* this.authService.isAuthenticated
    .pipe(tap(isLoggedIn => {
      if(isLoggedIn == false) {
        this.router.navigate(['/login']); 
      }
    })) */
  }
  
}
