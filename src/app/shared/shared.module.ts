import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [LogoutButtonComponent, MenuToggleComponent],
  imports: [IonicModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    LogoutButtonComponent,
    MenuToggleComponent,
    NgCalendarModule
  ]
})
export class SharedModule { }
