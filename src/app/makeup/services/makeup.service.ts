import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { AuthService } from 'src/app/core/services/auth.service';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { MakeUp } from '../models/makeup.model';

@Injectable({
  providedIn: 'root'
})
export class MakeupService extends Firestore<MakeUp> {

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/artists/${user.uid}/makeups`, (ref: firestore.CollectionReference) => {
          return ref.orderBy('name', 'asc');
        });  // /users/jfalsdjf334ii3/makeup
        return;
      }
      this.setCollection(null);
    });
  }
}
