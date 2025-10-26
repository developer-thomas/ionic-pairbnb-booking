import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false,
})
export class AuthPage implements OnInit {

  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder
  ) 
    {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
    }

  ngOnInit() {

  }

  onLogin() {
    const { email, password } = this.form.value;

    this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...'}).then(loadingEl => {
      loadingEl.present();

      setTimeout(() => {
        this.authService.login();
        this.router.navigate(['/places/discover']);
        loadingEl.dismiss();
      }, 1500);
      

    });
  }
}
