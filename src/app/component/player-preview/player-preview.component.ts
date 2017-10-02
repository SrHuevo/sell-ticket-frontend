import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-player-preview',
  templateUrl: './player-preview.component.html',
  styleUrls: ['./player-preview.component.css']
})
export class PlayerPreviewComponent implements OnInit {

  @Input() player

  constructor() { }

  ngOnInit() {
  }

}
