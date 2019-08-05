import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterMakeupService {

  private document: AngularFirestoreDocument<{}>;

  constructor(private authService: AuthService, private db: AngularFirestore) {
    this.init();
   }


   private init(): void {
    this.authService.authState$.subscribe(user => {
     if (user) {
      this.document = this.db.collection('/artists').doc(`${user.uid}`);
      this.document.set({id : user.uid, name: user.displayName, email: user.email});
      return;
     }
     this.document.collection(null);
    });
  }

  public setItem(item: any): Promise<any> {
    return this.document.set(item, { merge: true }).then(() => item);
  }

}
