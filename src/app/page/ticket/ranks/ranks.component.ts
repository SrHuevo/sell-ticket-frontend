import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../../service/ticket.service'
import {IntervalObservable} from 'rxjs/observable/IntervalObservable'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.css']
})
export class RanksComponent implements OnInit {

  ranks

  constructor(
    public ticketService: TicketService
  ) { }

  ngOnInit() {
    this.ranks = {}
    const observableInterval = IntervalObservable.create(10000)
    const observableGetRanks = this.ticketService.getRanks()
    observableInterval.switchMap(() => observableGetRanks)
    .subscribe(response => {
      this.ranks = response.json()
    })
  }

}

interface ranks {

}
