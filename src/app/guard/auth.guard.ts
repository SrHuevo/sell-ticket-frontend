import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'
import {AuthService} from '../service/auth.service'
import {UserService} from '../service/user.service'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/catch'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let url: string = state.url;
    if(this.checkLogin(url)) {
      return this.userService.getMe().map(() => true).catch(() => Observable.of(false))
    }
    return false
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) return true;
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
