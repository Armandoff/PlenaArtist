import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'makeup', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'makeup', loadChildren: './makeup/makeup.module#MakeupModule', canLoad: [AuthGuard] },
  { path: 'makeup-profile', loadChildren: './users/pages/makeup-profile/makeup-profile.module#MakeupProfilePageModule', canLoad: [AuthGuard] },
  { path: 'image-modal', loadChildren: './shared/pages/image-modal/image-modal.module#ImageModalPageModule', canLoad: [AuthGuard] },
  { path: 'edit-profile', loadChildren: './users/pages/edit-profile/edit-profile.module#EditProfilePageModule', canLoad: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
