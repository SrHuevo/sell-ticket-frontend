import { Injectable } from '@angular/core';
import {Ticket} from '../pojo/ticket'
import {Headers, Http, RequestOptions} from '@angular/http'
import {AuthService} from './auth.service'
import {environment} from '../../environments/environment'

@Injectable()
export class TicketService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  sell(ticket: Ticket) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.urlServer}/ticket`, JSON.stringify(ticket), options)
  }

  getList() {
    const headers = new Headers({
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.urlServer}/ticket`, options)
  }

  get(ticketId) {
    const headers = new Headers({
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${environment.urlServer}/ticket/${ticketId}`, options)
  }

  update(ticketId, user) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      authorization: `Bearer ${this.authService.jwt}`
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${environment.urlServer}/ticket/${ticketId}`, user, options)
  }

}
