import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register-makeup',
        loadChildren: './pages/register-makeup/register-makeup.module#RegisterMakeupPageModule'
      },
      {
        path: '',
        loadChildren: './pages/login/login.module#LoginPageModule'
      }
    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
