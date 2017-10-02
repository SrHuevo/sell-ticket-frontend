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
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {TicketService} from './service/ticket.service';
import { TicketListComponent } from './page/ticket/ticket-list/ticket-list.component';
import { RegisterComponent } from './page/user/register/register.component';
import { TicketUpdateComponent } from './page/ticket/ticket-update/ticket-update.component';
import { UsersListComponent } from './page/user/users-list/users-list.component';
import { UserUpdateComponent } from './page/user/user-update/user-update.component';
import { UserPassUpdateComponent } from './page/user/user-pass-update/user-pass-update.component';
import { RankComponent } from './component/rank/rank.component';
import { FinderTicketComponent } from './component/finder-ticket/finder-ticket.component';
import { AddPointsTicketComponent } from './component/add-points-ticket/add-points-ticket.component';
import { RanksComponent } from './page/ticket/ranks/ranks.component';
import { PlayerPreviewComponent } from './component/player-preview/player-preview.component';
import { DeadComponent } from './page/ticket/dead/dead.component';
import { RateComponent } from './page/ticket/rate/rate.component';

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user', children: [
    {path: '', pathMatch: 'full', redirectTo: 'register'},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'list', component: UsersListComponent, canActivate: [AuthGuard]},
    {path: ':userId', component: UserUpdateComponent, canActivate: [AuthGuard]},
    {path: ':userId/pass', component: UserPassUpdateComponent},
  ]},
  {path: 'ticket', canActivate: [AuthGuard], children: [
    {path: '', pathMatch: 'full', redirectTo: 'sell'},
    {path: 'sell', component: SellComponent},
    {path: 'list', component: TicketListComponent},
    {path: 'rate', component: RateComponent},
    {path: 'dead', component: DeadComponent},
    {path: 'ranks', component: RanksComponent},
    {path: ':ticketId', component: TicketUpdateComponent},
  ]},
  {path: '**', redirectTo: '/ticket/sell'},
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SellComponent,
    TicketListComponent,
    RegisterComponent,
    TicketUpdateComponent,
    UsersListComponent,
    UserUpdateComponent,
    UserPassUpdateComponent,
    RankComponent,
    FinderTicketComponent,
    AddPointsTicketComponent,
    RanksComponent,
    PlayerPreviewComponent,
    DeadComponent,
    RateComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CollapseModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    AuthGuard,
    AuthService,
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
