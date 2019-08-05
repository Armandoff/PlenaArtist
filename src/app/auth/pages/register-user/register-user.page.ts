import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { finalize } from 'rxjs/operators';

import { RegisterUserService } from './../../services/register-user.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  registerForm: FormGroup;
  public fotoUrl: Observable<string>;
  public uploadPercent: Observable<number>;
  public foto: string;

  constructor(private fb: FormBuilder, private overlayService: OverlayService,
              private navCtrl: NavController, private registerUserService: RegisterUserService,
              private camera: Camera, private platform: Platform,
              private file: File, private storage: AngularFireStorage,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  async openGalery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      const fileUrl: string = await this.camera.getPicture(options);
      let file: string;
      if (this.platform.is('ios')) {
        file = fileUrl.split('/').pop();
      } else {
        file = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.indexOf('?'));
      }

      const path: string = fileUrl.substring(0, fileUrl.lastIndexOf('/'));
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buffer], {type: 'image/jpeg'});
      this.uploadPicture(blob);

    } catch (error) {
      console.log(error);
    }
  }

  private uploadPicture(blob: Blob) {
    this.authService.authState$.subscribe(user => {
      if (user) {
        const ref = this.storage.ref(`users/${user.uid}/images/foto.jpg`);
        const task = ref.put(blob);
        this.uploadPercent = task.percentageChanges();

        task.snapshotChanges().pipe(
          finalize(() => {
            this.fotoUrl = ref.getDownloadURL();
            this.fotoUrl.subscribe(val => this.foto = val);
          })
        )
        .subscribe();
      }
    });
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      phone: ['', [Validators.required]],
      image: [''],
      rating: [''],
      makeupsMade: [''],
      profile: ['Usuario', [Validators.required]],
      district: ['', [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]]
    });
  }

  get phone(): FormControl {
    return <FormControl>this.registerForm.get('phone');
  }

  get image(): FormControl {
    return <FormControl>this.registerForm.get('image');
  }

  get rating(): FormControl {
    return <FormControl>this.registerForm.get('rating');
  }

  get makeupsMade(): FormControl {
    return <FormControl>this.registerForm.get('makeupsMade');
  }

  get profile(): FormControl {
    return <FormControl>this.registerForm.get('profile');
  }

  get district(): FormControl {
    return <FormControl>this.registerForm.get('district');
  }

  get street(): FormControl {
    return <FormControl>this.registerForm.get('street');
  }

  get houseNumber(): FormControl {
    return <FormControl>this.registerForm.get('houseNumber');
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando...'
    });
    try {
      this.image.setValue(this.foto);
      await this.registerUserService.setItem(this.registerForm.value);
      console.log('Informações Salvas: ', this.registerForm.value);
      this.navCtrl.navigateForward('/makeup');
    } catch (error) {
      console.log('Erro ao salvar dados: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
    // console.log('Values: ', this.registerForm.value);
  }

}
