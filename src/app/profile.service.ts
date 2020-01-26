import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Artist } from 'src/app/core/models/artist.model';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private document: AngularFirestoreDocument<Artist>;

  artist$: Observable<Artist>;
  artist: Artist;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    this.init();
   }

   private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.artist$ = this.db.collection('/artists').doc<Artist>(`/${user.uid}`).valueChanges();
        this.artist$.subscribe(artist => {
          this.artist = artist;
          // console.log(this.artist);
        });
      }
    });
  }
}
