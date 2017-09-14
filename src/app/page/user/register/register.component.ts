import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {UserService} from '../../../service/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup

  constructor(
    fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = fb.group({
      name : [null, Validators.required],
      email: [null, Validators.required],
    })
  }

  ngOnInit() {
  }

  submitForm(){
    const user = this.form.value
    user.profiles = ["USER_CREATOR", "USER_EDITOR", "CHECKING"]
    this.userService.register(this.form.value).subscribe(
      data => {
        this.form.reset()
        alert('Usuario creado, le llegara un correo en breves con la informacion para cambiar la contraseña')
      },
      error => {
        alert('No se ha podido crear el usuario, algo catastrofico ha debido ocurrir, intentalo de nuevo y si no llama a Dani 611463460')
      })
  }
}
