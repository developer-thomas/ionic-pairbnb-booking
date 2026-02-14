import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/places.model';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular'; 
import { PlacesStore } from '../discover/store/places.store';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
  standalone: false,
})
export class OffersPage implements OnInit {

  loadedOffers!: Place[];
  userOffers$ = this.placesStore.userOffers$;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private placesStore: PlacesStore,
    private alertCtrl: AlertController
  ) { }


  ngOnInit() {
    this.triggerUserOffers()
  }

  ionViewWillEnter() {
    this.triggerUserOffers();
  }

  private triggerUserOffers() {
    this.placesService.listUserOffers();
  }

  onEdit(offerId: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/places/offers/edit', offerId]);
  }
  
  async onDelete(offerId: number, slidingItem: IonItemSliding) {
    slidingItem.close();

    const alert = await this.alertCtrl.create({
      header: 'Delete',
      message: 'Would you like to delete this offer?',
      buttons: [
        { text: 'Yes', role: 'destructive', handler: () => this.deleteOffer(offerId) },
        { text: 'No', role: 'cancel' }
      ]
    })

    await alert.present();
  }

  deleteOffer(offerId: number) {
    this.placesService.deletePlace(offerId);
  }
  
}
