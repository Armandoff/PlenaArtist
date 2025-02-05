import { Component, OnInit, Input } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

import { AuthService } from './../../../core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-logout-button',
  template: `
      <ion-button expand="full" (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>Sair
      </ion-button>
  `
})
export class LogoutButtonComponent implements OnInit {

  @Input() menu: string;

  constructor(private authService: AuthService, private navCtrl: NavController,
              private overlayService: OverlayService, private menuCtrl: MenuController) { }

  async ngOnInit(): Promise<void> {
    if (!await (this.menuCtrl.isEnabled(this.menu))) {
      this.menuCtrl.enable(true, this.menu);
    }
  }

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: 'Realmente deseja sair?',
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.authService.logout();
            await this.menuCtrl.enable(false, this.menu);
            this.navCtrl.navigateRoot('/login');
          }
        },
        'Não'
      ]
    });
  }

}
