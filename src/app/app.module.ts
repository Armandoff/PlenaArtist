import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';

import { ImageModalPageModule } from './shared/pages/image-modal/image-modal.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    ImageModalPageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
