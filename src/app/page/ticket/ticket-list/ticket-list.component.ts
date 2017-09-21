import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../../service/ticket.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets

  constructor(
    public ticketService: TicketService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ticketService.getList().subscribe(response => {
      this.tickets = response.json()
    })
  }

  updateTicket(ticket) {
    this.router.navigate(['/ticket/', ticket._id]);
  }

}
