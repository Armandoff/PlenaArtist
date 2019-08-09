import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Artist } from 'src/app/core/models/artist.model';
import { AuthService } from './../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MakeupProfileService {

  private document: AngularFirestoreDocument<Artist>;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    this.init();
   }

   private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.document = this.db.collection('/artists').doc<Artist>(`/${user.uid}`);
      }
    });
  }

  public getData(): Observable<Artist> {
    return this.document.valueChanges();
  }
}
