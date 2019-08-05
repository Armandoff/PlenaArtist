import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: './pages/makeup-save/makeup-save.module#MakeupSavePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/makeup-save/makeup-save.module#MakeupSavePageModule'
      },
      {
        path: 'presentation/:id',
        loadChildren: './pages/makeup-presentation/makeup-presentation.module#MakeupPresentationPageModule'
      },
      {
        path: '',
        loadChildren: './pages/makeup-list/makeup-list.module#MakeupListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeupRoutingModule { }
