import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../../service/ticket.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  dorsal
  players = []

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit() {
  }

  dorsalWritter(event) {
    if(!/\d/g.test(event.key)) {
      const dorsal = event.path[0].value
      this.ticketService.get(dorsal).subscribe(
        response => {
          this.players.push({dorsal, weapon: response.json().weapon})
        },
        error => this.players.push({dorsal})

      )
      event.path[0].value = ''
      event.preventDefault()
    }
  }

  giveWeapon(player) {
    player.weapon = !player.weapon
  }

  deletePlayer(player) {
    const index = this.players.indexOf(player)
    if(index !== -1) {
      this.players.splice(index, 1)
    }
  }

  saveTests() {
    this.ticketService.tests(this.players).subscribe(
      () => this.players = [],
      () => alert('Error catastrofico, intentalo de nuevo, si no funciona prueba a hacer login de nuevo, si sigue sin funcionar deja todo apuntado en tu libreta y manda un wasap a Dani')
    )
  }
}
