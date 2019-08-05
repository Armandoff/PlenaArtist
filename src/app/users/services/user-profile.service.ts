import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserData } from './../../auth/models/userdata';
import { AuthService } from './../../core/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private document: AngularFirestoreDocument<UserData>;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.document = this.db.collection('/users').doc<UserData>(`/${user.uid}`);
      }
    });
  }

  public getData(): Observable<UserData> {
    return this.document.valueChanges();
  }
}
