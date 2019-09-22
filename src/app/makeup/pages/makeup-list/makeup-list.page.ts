import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { take } from 'rxjs/operators';

import { ArtistsService } from './../../services/artists.service';
import { MakeUp } from '../../models/makeup.model';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-makeup-list',
  templateUrl: './makeup-list.page.html',
  styleUrls: ['./makeup-list.page.scss'],
})
export class MakeupListPage implements OnInit {

  artists: Observable<any[]>;

  // makeups$: Observable<MakeUp[]>;
  artists$: Observable<Artist[]>;

  constructor(private navCtrl: NavController, private overlayService: OverlayService,
              private artistsService: ArtistsService) {

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
