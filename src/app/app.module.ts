import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { NavbarComponent } from './component/navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router'
import {CollapseModule} from 'ngx-bootstrap'
import {UserService} from './service/user.service';
import { LoginComponent } from './page/login/login.component';
import { SellComponent } from './page/ticket/sell/sell.component'
import {AuthGuard} from './guard/auth.guard'
import {AuthService} from './service/auth.service'
import {HttpModule} from '@angular/http'
import {FormsModule} from '@angular/forms'

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'ticket', children: [
    {path: '', pathMatch: 'full', redirectTo: 'sell'},
    {path: 'sell', component: SellComponent, canActivate: [AuthGuard]},
  ]},
  {path: '**', redirectTo: '/ticket/sell'}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SellComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CollapseModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
  ],
  providers: [
    UserService,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
