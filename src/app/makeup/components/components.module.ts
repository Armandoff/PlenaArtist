import { NgModule } from '@angular/core';

import { MakeupItemComponent } from './makeup-item/makeup-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MakeupItemComponent],
  imports: [
    SharedModule
  ],
  exports: [MakeupItemComponent]

})
export class ComponentsModule { }
