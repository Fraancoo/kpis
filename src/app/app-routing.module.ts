import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashManagerialComponent } from './components/dash-managerial/dash-managerial.component';
import { DashTeamMemberComponent } from './components/dash-team-member/dash-team-member.component';

//Authentication
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  // {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'managerial'
      },
      {
        path: 'managerial',
        component: DashManagerialComponent
      },
      {
        path: 'team-member',
        component: DashTeamMemberComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
