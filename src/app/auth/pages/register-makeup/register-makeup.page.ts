import { File } from '@ionic-native/file/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { RegisterMakeupService } from '../../services/register-makeup.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-makeup',
  templateUrl: './register-makeup.page.html',
  styleUrls: ['./register-makeup.page.scss'],
})
export class RegisterMakeupPage implements OnInit {

  registerForm: FormGroup;
  public fotoPerfilUrl: Observable<string>;
  public uploadPerfilPercent: Observable<number>;
  public fotoPerfil: string;
  public fotoPerfilOk: string;

  public foto1Url: Observable<string>;
  public upload1Percent: Observable<number>;
  public foto1: string;
  public foto1Ok: string;

  public foto2Url: Observable<string>;
  public upload2Percent: Observable<number>;
  public foto2: string;
  public foto2Ok: string;

  public foto3Url: Observable<string>;
  public upload3Percent: Observable<number>;
  public foto3: string;
  public foto3Ok: string;

  public foto4Url: Observable<string>;
  public upload4Percent: Observable<number>;
  public foto4: string;
  public foto4Ok: string;

  public foto5Url: Observable<string>;
  public upload5Percent: Observable<number>;
  public foto5: string;
  public foto5Ok: string;

  /*
  public events = [
    { val: 'Casamentos', isChecked: false },
    { val: 'Formaturas', isChecked: false },
    { val: 'Festas 15 anos', isChecked: false },
    { val: 'Aniversários', isChecked: false },
    { val: 'Festivais', isChecked: false },
    { val: 'Carnaval', isChecked: false },
    { val: 'Réveillon', isChecked: false },
    { val: 'Debutante', isChecked: false }
  ];
  */

  constructor(private fb: FormBuilder, private overlayService: OverlayService,
              private navCtrl: NavController, private registerMakeupService: RegisterMakeupService,
              private camera: Camera, private platform: Platform,
              private file: File, private storage: AngularFireStorage,
              private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  async openGalery(name: string, num: number) {
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
      this.uploadPicture(blob, name, num);

    } catch (error) {
      console.log(error);
    }
  }

  private uploadPicture(blob: Blob, name: string, num: number) {
    this.authService.authState$.subscribe(user => {
      if (user) {
        const ref = this.storage.ref(`artists/${user.uid}/images/${name}.jpg`);
        const task = ref.put(blob);

        if (num === 0) { this.uploadPerfilPercent = task.percentageChanges(); this.fotoPerfilOk = ''; }
        if (num === 1) { this.upload1Percent = task.percentageChanges(); this.foto1Ok = ''; }
        if (num === 2) { this.upload2Percent = task.percentageChanges(); this.foto2Ok = ''; }
        if (num === 3) { this.upload3Percent = task.percentageChanges(); this.foto3Ok = ''; }
        if (num === 4) { this.upload4Percent = task.percentageChanges(); this.foto4Ok = ''; }
        if (num === 5) { this.upload5Percent = task.percentageChanges(); this.foto5Ok = ''; }

        task.snapshotChanges().pipe(
          finalize(() => {
            if (num === 0) {
              this.fotoPerfilUrl = ref.getDownloadURL();
              this.fotoPerfilUrl.subscribe(val => this.fotoPerfil = val);
              this.fotoPerfilOk = 'Carregado';
            }
            if (num === 1) {
              this.foto1Url = ref.getDownloadURL();
              this.foto1Url.subscribe(val => this.foto1 = val);
              this.foto1Ok = 'Carregado';
            }
            if (num === 2) {
              this.foto2Url = ref.getDownloadURL();
              this.foto2Url.subscribe(val => this.foto2 = val);
              this.foto2Ok = 'Carregado';
            }
            if (num === 3) {
              this.foto3Url = ref.getDownloadURL();
              this.foto3Url.subscribe(val => this.foto3 = val);
              this.foto3Ok = 'Carregado';
            }
            if (num === 4) {
              this.foto4Url = ref.getDownloadURL();
              this.foto4Url.subscribe(val => this.foto4 = val);
              this.foto4Ok = 'Carregado';
            }
            if (num === 5) {
              this.foto5Url = ref.getDownloadURL();
              this.foto5Url.subscribe(val => this.foto5 = val);
              this.foto5Ok = 'Carregado';
            }
          })
        )
        .subscribe();
      }
    });
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      // specialties: ['', [Validators.required]],
      image: [''],
      description: [''],
      phone: ['', [Validators.required]],
      // district: ['', [Validators.required]],
      // street: ['', [Validators.required]],
      // houseNumber: ['', [Validators.required]]
    });
  }

  /*
  get specialties(): FormControl {
    return <FormControl>this.registerForm.get('specialties');
  }
  */

  get image(): FormControl {
    return <FormControl>this.registerForm.get('image');
  }

  get description(): FormControl {
    return <FormControl>this.registerForm.get('description');
  }

  get phone(): FormControl {
    return <FormControl>this.registerForm.get('phone');
  }

  /*
  get district(): FormControl {
    return <FormControl>this.registerForm.get('district');
  }

  get street(): FormControl {
    return <FormControl>this.registerForm.get('street');
  }

  get houseNumber(): FormControl {
    return <FormControl>this.registerForm.get('houseNumber');
  }
  */

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando...'
    });
    try {
      this.image.setValue(this.fotoPerfil);
      await this.registerMakeupService.setItem(this.registerForm.value);
      await this.registerMakeupService.setItem({ isActive: true });
      await this.registerMakeupService.setItem({foto1 : this.foto1});
      await this.registerMakeupService.setItem({foto2 : this.foto2});
      await this.registerMakeupService.setItem({foto3 : this.foto3});
      await this.registerMakeupService.setItem({foto4 : this.foto4});
      await this.registerMakeupService.setItem({foto5 : this.foto5});
      console.log('Informações Salvas: ', this.registerForm.value);
      // this.navCtrl.navigateForward('/makeup-profile');
      this.router.navigateByUrl('/makeup');
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
