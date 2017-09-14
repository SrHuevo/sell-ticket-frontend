import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getList().subscribe(response => {
      this.users = response.json()
    })
  }

  updateUser(user) {
    this.router.navigate(['/user/', user.email]);
  }

}
