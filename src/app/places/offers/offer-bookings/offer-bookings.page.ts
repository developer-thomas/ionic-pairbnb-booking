import { Component, DestroyRef, OnInit } from '@angular/core';
import { Place } from '../../models/places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlacesStore } from '../../discover/store/places.store';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
  standalone: false,
})
export class OfferBookingsPage implements OnInit {
  place!: Place;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private navCtrl: NavController,
    private placesService: PlacesService,
    private destroyRef: DestroyRef,
    private placesStore: PlacesStore
  ) { }

  // Mexi aqui 
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      
      const placeId = paramMap.get('placeId');
      
      this.placesService.getPlace(+placeId!)

      this.placesStore.onePlace$.subscribe({
        next: (place) => {
          this.place = place!;
        }
      })
    });
  }
}
