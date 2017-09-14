import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/range'
import {TicketService} from '../../../service/ticket.service'
import {Ticket} from '../../../pojo/ticket'

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  form : FormGroup
  nTickets = 1

  constructor(
    fb: FormBuilder,
    private ticketService: TicketService
  ) {
    this.form = fb.group({
      email : [null, Validators.required],
      dni: [null, Validators.required],
      name : [null, Validators.required],
      immortal : [null, Validators.required],
    })
  }

  ngOnInit() {
  }

  submitForm(){
    Observable.range(0, this.nTickets)
    .map(n => this.generateTicket(n))
    .map(ticket => this.ticketService.sell(ticket).subscribe(
      data => {
        this.form.reset()
        alert('Entrada vendida, le debe de llegar un correo en breve')
      },
      error => {
        alert('No se ha podido vender la entrada, algo catastrofico ha debido ocurrir, intentalo de nuevo y si no llama a Dani 611463460')
      }))
    .subscribe()
  }

  private generateTicket(n: number) {
    return new Ticket(
      this.form.value.email,
      this.form.value.dni,
      `${this.form.value.name}${n === 0 ? '' : n}`,
      this.form.value.immortal,
    )
  }

}
