import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeupSchedulePage } from './makeup-schedule.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MakeupSchedulePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MakeupSchedulePage]
})
export class MakeupSchedulePageModule {}
