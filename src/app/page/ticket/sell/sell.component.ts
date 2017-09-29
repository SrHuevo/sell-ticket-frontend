import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/range'
import 'rxjs/add/operator/map'
import {TicketService} from '../../../service/ticket.service'
import {Ticket} from '../../../pojo/ticket'
import {UserService} from '../../../service/user.service'

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  form : FormGroup
  nTickets = 1
  canReserve = false

  constructor(
    fb: FormBuilder,
    public userService: UserService,
    private ticketService: TicketService
  ) {
    this.form = fb.group({
      email : [null, Validators.required],
      dni: [null, Validators.required],
      name : [null, Validators.required],
      immortal : [null, Validators.required],
      reserved : [null, Validators.required],
    })
  }

  ngOnInit() {
    this.canReserve = this.userService.me.profiles.indexOf('CAN_RESERVE') != -1
    this.form.patchValue({reserved: this.canReserve})
  }

  submitForm(values){
    Observable.range(0, this.nTickets)
    .map(n => this.generateTicket(n, values))
    .map(ticket => {
      console.log(ticket)
      this.ticketService.sell(ticket).subscribe(
        data => {
          alert('Entrada vendida, le debe de llegar un correo en breve')
          this.form.reset()
          this.ngOnInit()
        },
        error => {
          alert('No se ha podido vender la entrada, algo catastrofico ha debido ocurrir, intentalo de nuevo y si no llama a Dani 611463460')
        })
    })
    .subscribe()
  }

  private generateTicket(n: number, values) {
    return new Ticket(
      values.email,
      values.dni,
      `${values.name}${n === 0 ? '' : n}`,
      values.immortal,
      values.reserved,
      false
    )
  }

}
