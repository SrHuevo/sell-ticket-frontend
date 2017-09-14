import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {UserService} from '../../../service/user.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  form : FormGroup
  userId: string

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      email : [null, Validators.required],
      name: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId
    this.userService.get(this.userId).subscribe(response => {
      const email = response.json().email
      const name = response.json().name
      this.form.setValue({email, name})
    })
  }

  update(form){
    this.userService.update(this.userId, form.value).subscribe(
      data => {
        alert('Usuario actualizado')
      },
      error => {
        alert('No se ha podido actualizar el usuario, algo catastrofico ha debido ocurrir, intentalo de nuevo y si no llama a Dani 611463460')
      })
  }

  newPassRequest(){
    this.userService.newPassRequest(this.userId).subscribe(
      data => {
        alert('Pronto le llegara un correo con la informacion para cambiar la contraseña')
      },
      error => {
        alert('No se ha podido mandar el email, algo catastrofico ha debido ocurrir, intentalo de nuevo y si no llama a Dani 611463460')
      })
  }

}
