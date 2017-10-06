import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {TicketService} from '../../../service/ticket.service'

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  form : FormGroup

  constructor(
    fb: FormBuilder,
    private ticketService: TicketService
  ) {
    this.form = fb.group({
      dorsal: [null, Validators.required],
      pointsSurvival: 0,
      pointsZombie: 0,
      pointsScary: 0,
      pointsMachiavellian: 0,
      pointsClumsy: 0,
      pointsSoapOperaDeath: 0,
    })
  }

  ngOnInit() {
  }

  submitForm(data) {
    const dorsal = data.dorsal
    const points = {
      pointsSurvival: Number(data.pointsSurvival),
      pointsZombie: Number(data.pointsZombie),
      pointsScary: Number(data.pointsScary),
      pointsPremature: Number(data.pointsPremature),
      pointsMachiavellian: Number(data.pointsMachiavellian),
      pointsClumsy: Number(data.pointsClumsy),
      pointsSoapOperaDeath: Number(data.pointsSoapOperaDeath),
    }
    this.ticketService.rate(dorsal, points).subscribe(
      () => {
        alert("Usuario puntuado correctamente")
        this.form.reset()
      },
      () => alert('Ha pasado algo terrible, vuelve a intentarlo!')
    )

  }


}
