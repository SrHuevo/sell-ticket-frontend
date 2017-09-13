import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String
  pass: String

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(this.authService.isLoggedIn) {
      this.router.navigate([this.authService.redirectUrl])
    }
  }

  login() {
    this.authService.login(this.email, this.pass)
    .subscribe(
      data => {
        this.router.navigate([this.authService.redirectUrl]);
      },
      error => {
        console.log(error)
      });
  }

}
