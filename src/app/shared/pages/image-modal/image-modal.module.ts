import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageModalPage } from './image-modal.page';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
  {
    path: '',
    component: ImageModalPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImageModalPage]
})
export class ImageModalPageModule {}
