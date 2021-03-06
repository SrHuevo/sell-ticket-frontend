import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http'
import {AuthService} from './auth.service'
import {User} from '../pojo/user'
import {ActivatedRoute, Router} from '@angular/router'
import {environment} from '../../environments/environment'

@Injectable()
export class UserService {

  _me

  constructor(
    private http: Http,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  set me(_me) {
    this._me = _me
  }

  get me() {
    if(this._me) return this._me
    this.getMe().subscribe(
      ()=>{},
      err => this.authService.logout().subscribe(() => {
        this.router.navigate(['/login'])
      })
    )

  }

  haveProfile(profile) {
    if(!this.me || !this.me.profiles) {
      return false
    }

    return this.me.profiles.indexOf(profile) !== -1
  }

  getMe() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.urlServer}/user/me`, options).do((response: Response) => {
      this.me = response.json()
    })
  }

  register(user: User) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.urlServer}/user/register`, JSON.stringify(user), options)
  }

  changePass(pass: {pass:string}) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.patch(`${environment.urlServer}/user/pass?token=${this.route.snapshot.queryParams['token']}`, JSON.stringify(pass), options)
  }

  getList() {
    const headers = new Headers({
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.urlServer}/user`, options)
  }

  get(userId) {
    const headers = new Headers({
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.urlServer}/user/${userId}`, options)
  }

  update(userId, user) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.urlServer}/user/${userId}`, user, options)
  }

  newPassRequest(userId) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.urlServer}/user/${userId}/pass`, {}, options)
  }

}
