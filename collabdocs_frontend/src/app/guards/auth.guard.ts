import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
// PUBLIC_INTERFACE
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // PUBLIC_INTERFACE
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => (isLoggedIn ? true : this.router.createUrlTree(['/login'])))
    );
  }
}
