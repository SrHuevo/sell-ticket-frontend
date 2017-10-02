import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  @Input() title: string
  @Input() rank

  constructor() { }

  ngOnInit() {
    this.rank = []
  }

}
