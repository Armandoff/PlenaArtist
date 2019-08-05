import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { MakeupProfileService } from './../../services/makeup-profile.service';
import { MakeupData } from './../../../auth/models/makeupdata';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Artist } from 'src/app/makeup/models/artist.model';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/shared/pages/image-modal/image-modal.page';

@Component({
  selector: 'app-makeup-profile',
  templateUrl: './makeup-profile.page.html',
  styleUrls: ['./makeup-profile.page.scss'],
})
export class MakeupProfilePage implements OnInit {

  artistData$: Observable<Artist>;
  artistData: Artist;

  images: Array<string> = [];

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  user: firebase.User;

  constructor(private overlayService: OverlayService, private makeupProfileService: MakeupProfileService,
              private authService: AuthService, private modalController: ModalController) { }

  async ngOnInit(): Promise<void> {
    const loadingInfo = await this.overlayService.loading();

    this.artistData$ = this.makeupProfileService.getData();
    this.artistData$.pipe(take(1)).subscribe(artistData => {
      this.artistData = artistData;
      this.images.push(this.artistData.foto1);
      this.images.push(this.artistData.foto2);
      this.images.push(this.artistData.foto3);
      this.images.push(this.artistData.foto4);
      this.images.push(this.artistData.foto5);
      loadingInfo.dismiss();
      console.log(this.artistData);
    });
    const loadingUser = await this.overlayService.loading();
    this.authService.authState$.subscribe(user => {
      this.user = user;
      loadingUser.dismiss();
      console.log(this.user);
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
