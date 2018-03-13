import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './layout/pages/users/users.component';
import { UserComponent } from './layout/pages/user/user.component';
import { AdministrationComponent } from './layout/pages/administration/administration.component';

import { NotAuthGuard } from './shared/not-auth-guard';
import { AuthGuard } from './shared/auth-guard ';

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: 'app/auth/registration/registration.module#RegistrationModule',
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/auth/login/login.module#LoginModule',
    canActivate: [NotAuthGuard]
  },

  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: { onlyActive: false }
      },
      {
        path: 'users/active',
        component: UsersComponent,
        data: { onlyActive: true }
      },
      {
        path: 'user/:id',
        component: UserComponent
      },
      {
        path: 'administration',
        component: AdministrationComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
