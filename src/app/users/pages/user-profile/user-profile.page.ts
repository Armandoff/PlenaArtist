import { UserProfileService } from './../../services/user-profile.service';
import { UserData } from './../../../auth/models/userdata';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userData$: Observable<UserData>;
  userData: UserData;

  user: firebase.User;

  constructor(private overlayService: OverlayService, private userProfileService: UserProfileService,
              private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    const loadingInfo = await this.overlayService.loading();

    this.userData$ = this.userProfileService.getData();
    this.userData$.pipe(take(1)).subscribe(userData => {
    this.userData = userData;
    loadingInfo.dismiss();
    console.log(this.userData);
    });
    const loadingUser = await this.overlayService.loading();
    this.authService.authState$.subscribe(user => {
    this.user = user;
    loadingUser.dismiss();
    console.log(this.user);
    });
  }

}
