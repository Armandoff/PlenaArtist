import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { MakeupProfileService } from './../../services/makeup-profile.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Artist } from 'src/app/core/models/artist.model';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/shared/pages/image-modal/image-modal.page';

@Component({
  selector: 'app-makeup-profile',
  templateUrl: './makeup-profile.page.html',
  styleUrls: ['./makeup-profile.page.scss'],
})
export class MakeupProfilePage implements OnInit {

  artist$: Observable<Artist>;
  artist: Artist;

  images: Array<string> = [];
  telefone: string;
  linkWhatsapp: string;
  mensagemWhatsapp: string = '&text=Ol%C3%A1%2C%20te%20encontrei%20pelo%20App%20Plena%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas!';

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(private overlayService: OverlayService, private makeupProfileService: MakeupProfileService,
              private modalController: ModalController) { }

  async ngOnInit(): Promise<void> {
    const loadingInfo = await this.overlayService.loading();

    this.artist$ = this.makeupProfileService.getData();
    this.artist$.subscribe(artist => {
      this.artist = artist;
      this.linkWhatsapp = 'https://api.whatsapp.com/send?phone=55' + artist.phone + this.mensagemWhatsapp;
      this.images.push(artist.foto1);
      this.images.push(artist.foto2);
      this.images.push(artist.foto3);
      this.images.push(artist.foto4);
      this.images.push(artist.foto5);
      console.log(this.artist);
      loadingInfo.dismiss();
    });

  }

  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

}
