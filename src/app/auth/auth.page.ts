import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false,
})
export class AuthPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) 
    { }

  ngOnInit() {
  }

  onLogin() {
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
