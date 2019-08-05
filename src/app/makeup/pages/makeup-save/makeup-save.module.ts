import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeupSavePage } from './makeup-save.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MakeupSavePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MakeupSavePage]
})
export class MakeupSavePageModule {}
