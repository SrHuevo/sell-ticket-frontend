import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {UserService} from '../../../service/user.service'

@Component({
  selector: 'app-user-pass-update',
  templateUrl: './user-pass-update.component.html',
  styleUrls: ['./user-pass-update.component.css']
})
export class UserPassUpdateComponent implements OnInit {

  form : FormGroup

  constructor(
    fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = fb.group({
      pass : [null,  Validators.compose([Validators.required, Validators.minLength(8)])],
      passConfirm: [null, Validators.required],
    }, {
      validator: this.checkPasswords,
    })
  }

  ngOnInit() {
  }

  submitForm(values){
    this.userService.changePass(values).subscribe(
      data => {
        this.form.reset()
        alert('Contraseña cambiada con exito disfruta!')
      },
      error => {
        alert('No se ha podido cambiar la contraseña, algo catastrofico ha debido ocurrir, intentalo de nuevo y si no llama a Dani 611463460')
      })
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.pass.value;
    const confirmPass = group.controls.passConfirm.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}
