import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/observable/of'
import {environment} from '../../environments/environment'

@Injectable()
export class AuthService {

  private _redirectUrl: string

  logged = false

  constructor(
    private http: Http
  ){}

  login(email: String, pass: String): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.urlServer}/user/login`, JSON.stringify({email, pass}), options)
      .do((response: Response) => {
        localStorage.setItem('jwt',response.json().jwt)
    })
  }

  logout(): Observable<void> {
    return Observable.of(null).do(() => {
      this.logged = false
      localStorage.removeItem('jwt')
    })
  }

  get redirectUrl():string {
      return this._redirectUrl || '/ticket/sell'
  }

  set redirectUrl(redirectUrl: string) {
      this._redirectUrl = redirectUrl
  }

  get isLoggedIn(): boolean {
    this.logged = localStorage.getItem('jwt') !== null
    return this.logged
  }

  get jwt(): string {
    return localStorage.getItem('jwt')
  }

}
