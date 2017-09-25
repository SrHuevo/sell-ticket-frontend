import { Component } from '@angular/core';
import {UserService} from './service/user.service'
import {AuthService} from './service/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    userService.getMe().subscribe(
      ()=>{},
      err => authService.logout().subscribe(() => {
      this.router.navigate(['/login'])
    })
    )
  }
}
