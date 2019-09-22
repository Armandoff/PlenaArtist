import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeupPresentationPage } from './makeup-presentation.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MakeupPresentationPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MakeupPresentationPage]
})
export class MakeupPresentationPageModule {}
