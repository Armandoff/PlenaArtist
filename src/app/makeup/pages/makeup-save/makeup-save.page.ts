import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { MakeupService } from './../../services/makeup.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-makeup-save',
  templateUrl: './makeup-save.page.html',
  styleUrls: ['./makeup-save.page.scss'],
})
export class MakeupSavePage implements OnInit {

  makeupForm: FormGroup;
  pageTitle = '...';
  makeupId: string = undefined;

  constructor(private fb: FormBuilder, private navCtrl: NavController,
              private overlayService: OverlayService, private makeupService: MakeupService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const makeupId = this.route.snapshot.paramMap.get('id');
    if (!makeupId) {
      this.pageTitle = 'Criar Maquiadora';
      return;
    }
    this.makeupId = makeupId;
    console.log('MakeUp ID: ', makeupId);
    this.pageTitle = 'Editar Maquiadora';
    this.makeupService.get(makeupId)
      .pipe(take(1))
      .subscribe(({ name, image, specialties, worksdone, rating }) => {
        this.makeupForm.get('name').setValue(name);
        this.makeupForm.get('image').setValue(image);
        this.makeupForm.get('specialties').setValue(specialties);
        this.makeupForm.get('worksdone').setValue(worksdone);
        this.makeupForm.get('rating').setValue(rating);
      });
  }

  private createForm(): void {
    this.makeupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      image: ['null'],
      specialties: ['', [Validators.required, Validators.minLength(5)]],
      worksdone: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    })
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando...'
    });
    try {
      const makeup = !this.makeupId
      ? await this.makeupService.create(this.makeupForm.value)
      : await this.makeupService.update({
        id: this.makeupId,
        ...this.makeupForm.value
      });
      console.log('MakeUp salva: ', makeup);
      this.navCtrl.navigateBack('/makeup');
    } catch (error) {
      console.log('Erro ao salvar Makeup: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }

}
