import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController, Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  img: any;

  @ViewChild('slider', { read: ElementRef })slider: ElementRef;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  }

  constructor(private navParams: NavParams, private modalController: ModalController,
              private platform: Platform, private navCtrl: NavController) { }

  ngOnInit() {
    this.img = this.navParams.get('img');

    this.platform.ready().then(() => {
      document.addEventListener('backbutton', this.close, false); // nao funciona ainda
    });
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close(ev: Event) {
    this.modalController.dismiss();
    this.platform.ready().then(() => {
      document.removeEventListener('backbutton', this.close, false); // nao funciona ainda
    });
  }

}
