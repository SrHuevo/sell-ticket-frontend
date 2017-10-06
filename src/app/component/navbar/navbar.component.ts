import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service'
import {Router} from '@angular/router'
import {UserService} from '../../service/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed:boolean = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login'])
    })
  }

}
