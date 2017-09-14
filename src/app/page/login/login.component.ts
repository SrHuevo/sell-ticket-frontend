import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service'
import {Router} from '@angular/router'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup
  errors = {
    unauthorized: false,
    unknown: false,
  }

  constructor(
    private router: Router,
    fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = fb.group({
      email : [null, Validators.required],
      pass: [null, Validators.required],
    })
  }

  ngOnInit() {
    if(this.authService.isLoggedIn) {
      this.router.navigate([this.authService.redirectUrl])
    }
  }

  submitForm(values){
    this.errors.unknown = false
    this.errors.unauthorized = false
    this.authService.login(values.email, values.pass)
    .subscribe(
      data => {
        this.router.navigate([this.authService.redirectUrl]);
      },
      error => {
        if(error.status === 401)
          this.errors.unauthorized = true;
        else
          this.errors.unknown = true
      });
  }

}
