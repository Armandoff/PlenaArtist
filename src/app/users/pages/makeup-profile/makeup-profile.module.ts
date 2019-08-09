import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeupProfilePage } from './makeup-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MakeupProfilePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MakeupProfilePage]
})
export class MakeupProfilePageModule {}
