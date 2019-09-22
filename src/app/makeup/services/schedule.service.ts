import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Firestore } from 'src/app/core/classes/firestore.class';
import { MakeUp } from '../models/makeup.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends Firestore<MakeUp> {

  constructor(db: AngularFirestore) {
    super(db);
   }

   public init(artistId: string): void {
    this.setCollection(`/artists/${artistId}/makeups_todo`);
   }
}
