import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './../../../shared/shared.module';
import { RegisterMakeupPage } from './register-makeup.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterMakeupPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterMakeupPage]
})
export class RegisterMakeupPageModule {}
