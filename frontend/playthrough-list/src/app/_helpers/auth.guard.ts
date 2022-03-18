import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser.loginToken) {
      return true;
    }
    localStorage.setItem('interceptedPath', this.router.url)
    this.router.navigate(['login']);
    return false;
  }
  
}
