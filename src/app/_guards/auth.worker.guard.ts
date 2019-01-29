import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AlertService, AuthenticationService} from '@app/_services';

@Injectable({providedIn: 'root'})
export class AuthWorkerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.roles.length > 1) {
      return true;
    }

    this.router.navigate(['/about'], {queryParams: {returnUrl: '/'}});

    return false;
  }
}
