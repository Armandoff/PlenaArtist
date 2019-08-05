import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthProvider } from './../../../core/services/auth.types';
import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private perfilControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private fb: FormBuilder,
              private overlayService: OverlayService, private navCtrl: NavController,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }

  get perfil(): FormControl {
    return <FormControl>this.authForm.get('perfil');
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create account' : 'Already have an account';
    if (!isSignIn) {
      this.authForm.addControl('name' , this.nameControl);
      this.authForm.addControl('perfil' , this.perfilControl);
    } else {
      this.authForm.removeControl('name');
      this.authForm.removeControl('perfil');
    }
    //!isSignIn ? this.authForm.addControl('name' , this.nameControl)
    //: this.authForm.removeControl('name');
  }


  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('Authenticated: ', credentials);
      console.log('Redirecting...');
      if (this.configs.isSignIn === false) {
        if (this.authForm.value.perfil === 'Maquiadora') {
          this.navCtrl.navigateForward('/login/register-makeup');
        } else if (this.authForm.value.perfil === 'Usuario') {
          this.navCtrl.navigateForward('/login/register-user');
        }
      } else {
        this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/makeup');
      }
    } catch (e) {
      console.log('Auth error: ', e);
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }

}
