import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {TicketService} from '../../../service/ticket.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {

  form: FormGroup
  ticketId: string

  constructor(
    fb: FormBuilder,
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      name : [null, Validators.required],
      email : [null, Validators.required],
      dni : [null, Validators.required],
      immortal : [null, Validators.required],
    })
  }

  ngOnInit() {
    this.ticketId = this.route.snapshot.params.ticketId
    this.ticketService.get(this.ticketId).subscribe(response => {
      const email = response.json().email
      const name = response.json().name
      const dni = response.json().dni
      const immortal = response.json().immortal
      this.form.setValue({email, name, dni, immortal})
    })
  }

  update(form){
    this.ticketService.update(this.ticketId, form.value).subscribe(
      data => {
        alert('Entrada actualizada, pronto le llegara el correo con los nuevos datos.')
      },
      error => {
        alert('No se ha podido actualizar la entrada, algo catastrofico ha debido ocurrir, intentalo de nuevo y si no llama a Dani 611463460')
      })
  }

}
