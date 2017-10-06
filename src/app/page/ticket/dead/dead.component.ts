import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {TicketService} from '../../../service/ticket.service'

@Component({
  selector: 'app-dead',
  templateUrl: './dead.component.html',
  styleUrls: ['./dead.component.css']
})
export class DeadComponent implements OnInit {

  form : FormGroup
  player

  constructor(
    fb: FormBuilder,
    private ticketService: TicketService
  ) {
    this.form = fb.group({
      dorsal: [null, Validators.required],
      kills: [null, Validators.required],
    })
  }

  ngOnInit() {
  }

  clearWeaponInfo() {
    this.player = undefined
  }

  findDorsal(dorsal) {
    this.ticketService.get(dorsal)
    .map(response => response.json())
    .subscribe(response => {
      this.player = response
    })
  }

  submitForm(data) {
    const dorsal = data.dorsal
    this.ticketService.dead(dorsal, {kills: data.kills}).subscribe(
      () => {
        alert("Usuario apuntuado correctamente")
        this.form.reset()
      },
      () => alert('Ha pasado algo terrible, vuelve a intentarlo!')
    )

  }

}
