import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../../service/ticket.service'
import {Router} from '@angular/router'
import {UserService} from '../../../service/user.service'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets

  constructor(
    public ticketService: TicketService,
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    const canReserve = this.userService.me.profiles.indexOf('CAN_RESERVE') != -1
    this.ticketService.getList().subscribe(response => {
      this.tickets = response.json().filter(ticket => canReserve || !ticket.reserved)
    })
  }

  updateTicket(ticket) {
    this.router.navigate(['/ticket/', ticket._id]);
  }

}
