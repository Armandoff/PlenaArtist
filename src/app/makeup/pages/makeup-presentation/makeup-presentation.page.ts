import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

import { MakeUp } from '../../models/makeup.model';
import { ImageModalPage } from 'src/app/shared/pages/image-modal/image-modal.page';

@Component({
  selector: 'app-makeup-presentation',
  templateUrl: './makeup-presentation.page.html',
  styleUrls: ['./makeup-presentation.page.scss'],
})
export class MakeupPresentationPage implements OnInit {

  private document: AngularFirestoreDocument<MakeUp>;
  makeup: MakeUp;
  makeupId: string = undefined;
  images: Array<string> = [];

  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  constructor(private route: ActivatedRoute, private db: AngularFirestore,
              private modalController: ModalController) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    const makeupId = this.route.snapshot.paramMap.get('id');
    this.makeupId = makeupId;
    this.document = this.db.collection('/artists').doc<MakeUp>(`/${this.makeupId}`);
    this.document.valueChanges().pipe(take(1)).subscribe((makeup) => {
      this.makeup = makeup;
      this.images.push(this.makeup.foto1);
      this.images.push(this.makeup.foto2);
      this.images.push(this.makeup.foto3);
      this.images.push(this.makeup.foto4);
      this.images.push(this.makeup.foto5);
      console.log(this.makeup);
    });
    console.log('MakeUp ID: ', makeupId);
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
