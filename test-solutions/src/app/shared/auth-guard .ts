import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.ifLoggedIn()) return true
    this.router.navigateByUrl('/login');
    return false
  }
  canActivateChild() {
    if (this.authService.ifLoggedIn()) return true
    this.router.navigateByUrl('/login');
    return false
  }
}
