import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/places.model';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular'; 
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
    private placesStore: PlacesStore
  ) { }


  ngOnInit() {
    this.triggerUserOffers()
  }


  private triggerUserOffers() {
    this.placesService.listUserOffers();
  }

  onEdit(offerId: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/places/offers/edit', offerId]);
  }
}
