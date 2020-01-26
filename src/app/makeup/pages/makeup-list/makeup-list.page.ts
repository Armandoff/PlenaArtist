import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ArtistsService } from './../../services/artists.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-makeup-list',
  templateUrl: './makeup-list.page.html',
  styleUrls: ['./makeup-list.page.scss'],
})
export class MakeupListPage implements OnInit {

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  artists: Observable<any[]>;

  // makeups$: Observable<MakeUp[]>;
  artists$: Observable<Artist[]>;
  modal: any;

  subscribe: any;

  constructor(private navCtrl: NavController, private overlayService: OverlayService,
              private artistsService: ArtistsService, public platform: Platform,
              private router: Router, private modalCtrl: ModalController) {

                /*this.subscribe = this.platform.backButton.subscribe(() => {
                  if (this.constructor.name === 'MakeupListPage') {
                    if (window.confirm('Deseja sair do App')) {
                      navigator['app'].exitApp();
                    }
                  }
                });*/

                /*
                this.platform.ready().then(() => {
                  document.addEventListener('backbutton', () => {
                    if (this.constructor.name === 'MakeupListPage') {
                      if (window.confirm('Deseja sair do App?') {
                        navigator['app'].exitApp();
                      }
                    }
                  });
                });*/


                this.platform.ready().then(() => {
                  document.addEventListener('backbutton', () => {
                    if (this.router.url === '/makeup') {
                      if (window.confirm('Deseja sair do App?')) {
                        navigator['app'].exitApp();
                      }
                    } else {
                      modalCtrl.dismiss().then((val) => {
                        this.modal = val;
                        // console.log('val = ' + val);
                      }, (reason) => {
                        this.modal = reason;
                        // console.log('reason = ' + reason);
                        this.navCtrl.pop();
                      });
                    }
                });
              });
            }


  async ngOnInit(): Promise<void> {
     const loading = await this.overlayService.loading();
     this.artists$ = this.artistsService.getAll();

     this.artists$.pipe(take(1)).subscribe((artists) => {
      console.log(artists);
      loading.dismiss();
     });
  }

  openPerfil(artist: Artist): void {
    this.navCtrl.navigateForward(`/makeup/presentation/${artist.id}`);
  }

  /*
  async onDelete(makeup: MakeUp): Promise<void> {
    await this.overlayService.alert({
      message: `Deseja deletar a MakeUp "${makeup.name}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.makeupService.delete(makeup);
            await this.overlayService.toast({
              message: `MakeUp "${makeup.name}" excluída!`
            });
          }
        },
        'Não'
      ]
    });
  }
  */

}
