import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-toggle',
  template: `
    <ion-buttons slot="start">
      <ion-menu-toggle [menu]="menu">
       <ion-button>
         <ion-icon name="menu" slot="icon-only"></ion-icon>
       </ion-button>
      </ion-menu-toggle>
    </ion-buttons>
  `
})
export class MenuToggleComponent implements OnInit {

  @Input() menu: string;

  constructor(private menuCtrl: MenuController) { }

  async ngOnInit(): Promise<void> {
    if (!await (this.menuCtrl.isEnabled(this.menu))) {
      this.menuCtrl.enable(true, this.menu);
  }
}

}
