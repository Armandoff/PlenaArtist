import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Artist } from './../models/artist.model';
import { Firestore } from 'src/app/core/classes/firestore.class';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService extends Firestore<Artist> {

  constructor(db: AngularFirestore) {
    super(db);
    this.init();
   }

   private init(): void {
    this.setCollection(`/artists`);
  }

}
