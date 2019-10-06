import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EditProfilePage } from './edit-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EditProfilePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
