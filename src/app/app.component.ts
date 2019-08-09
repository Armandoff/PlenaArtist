import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  pages: { url: string, direction: string, icon: string, text: string }[];
  user: firebase.User;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.pages = [
      { url: '/makeup-profile', direction: 'forward', icon: 'document', text: 'Perfil'},
      { url: '/makeup-profile', direction: 'forward', icon: 'apps', text: 'Agendamentos'},
      { url: '/makeup-profile', direction: 'forward', icon: 'calendar', text: 'Favoritos'},
      { url: '/makeup-profile', direction: 'forward', icon: 'business', text: 'Formas de pagamento'},
      { url: '/makeup-profile', direction: 'forward', icon: 'chatboxes', text: 'Nossas maquiadoras'},
      { url: '/makeup-profile', direction: 'forward', icon: 'card', text: 'Dicas de maquiagem'},
      { url: '/makeup-profile', direction: 'forward', icon: 'contacts', text: 'Fale conosco'},
      { url: '/makeup-profile', direction: 'forward', icon: 'cube', text: 'Configurações'},
      { url: '/makeup-profile', direction: 'forward', icon: 'document', text: 'Ajuda'},
      { url: '/makeup-profile', direction: 'forward', icon: 'crop', text: 'Seja uma parceira'}
    ];

    this.authService.authState$.subscribe( user => this.user = user );

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
