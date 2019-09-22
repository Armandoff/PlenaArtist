import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { ModalController, NavController } from '@ionic/angular';

import { ImageModalPage } from 'src/app/shared/pages/image-modal/image-modal.page';
import { Observable } from 'rxjs';
import { Artist } from '../../models/artist.model';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { MakeUp } from '../../models/makeup.model';

@Component({
  selector: 'app-makeup-presentation',
  templateUrl: './makeup-presentation.page.html',
  styleUrls: ['./makeup-presentation.page.scss'],
})
export class MakeupPresentationPage implements OnInit {

  private document: AngularFirestoreDocument<Artist>;
  artist: Artist;
  artist$: Observable<Artist>;
  artistId: string = undefined;
  images: Array<string> = [];

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(private route: ActivatedRoute, private db: AngularFirestore,
              private modalController: ModalController, private overlayService: OverlayService,
              private navCtrl: NavController) { }

  ngOnInit(): void {
    this.init();
    this.profile_segment = 'list';
  }

  async init(): Promise<void> {
    const loadingInfo = await this.overlayService.loading();

    const artistId = this.route.snapshot.paramMap.get('id');
    this.artistId = artistId;
    this.document = this.db.collection('/artists').doc<Artist>(`/${this.artistId}`);
    this.artist$ = this.document.valueChanges();
    this.artist$.subscribe((artist) => {
      this.artist = artist;
      this.images.push(artist.foto1);
      this.images.push(artist.foto2);
      this.images.push(artist.foto3);
      this.images.push(artist.foto4);
      this.images.push(artist.foto5);
      loadingInfo.dismiss();
    });

    /*
    this.document.valueChanges().pipe(take(1)).subscribe((makeup) => {
      this.makeup = makeup;
      this.images.push(this.makeup.foto1);
      this.images.push(this.makeup.foto2);
      this.images.push(this.makeup.foto3);
      this.images.push(this.makeup.foto4);
      this.images.push(this.makeup.foto5);
      console.log(this.makeup);
    });
    */
    console.log('MakeUp ID: ', artistId);
  }

  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

  schedule(): void {
    this.navCtrl.navigateForward(`/makeup/schedule/${this.artistId}`);
  }

  
  public profile_segment:string;

  // You can get this data from your API. This is a dumb data for being an example.
  public images2 = [
    {
      id: 1,
      username: 'candelibas',
      profile_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg',
      post_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg'
    },
    {
      id: 2,
      username: 'candelibas',
      profile_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg',
      post_img: 'https://66.media.tumblr.com/7b749f77e5c95a418f163845f3baef65/tumblr_oxm9f8CqXL1umg1qro1_400.jpg'
    },
    {
      id: 3,
      username: 'candelibas',
      profile_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg',
      post_img: 'https://66.media.tumblr.com/7b749f77e5c95a418f163845f3baef65/tumblr_oxm9f8CqXL1umg1qro1_400.jpg'
    },
    {
      id: 4,
      username: 'candelibas',
      profile_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg',
      post_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg'
    },
    {
      id: 5,
      username: 'candelibas',
      profile_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg',
      post_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg'
    },
    {
      id: 6,
      username: 'candelibas',
      profile_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg',
      post_img: 'https://abrilvejasp.files.wordpress.com/2015/12/mulher-pincel-maquiagem.jpg'
    }
  ];


}
