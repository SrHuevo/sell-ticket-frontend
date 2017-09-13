import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/observable/of'

@Injectable()
export class AuthService {

  private _redirectUrl: string

  constructor(
    private http: Http
  ){}

  login(email: String, pass: String): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/user/login', JSON.stringify({email, pass}), options)
      .do((response: Response) => {
        localStorage.setItem('jwt',response.json().jwt)
    })
  }

  logout(): Observable<void> {
    return Observable.of(null).do(() => {
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
    return localStorage.getItem('jwt') !== null
  }

}
