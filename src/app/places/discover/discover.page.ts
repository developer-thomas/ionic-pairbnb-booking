import { Component, DestroyRef, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/places.model';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { PlacesStore } from './store/places.store';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: false,
})
export class DiscoverPage implements OnInit {

  allPlaces$: Observable<Place[]> = this.placesStore.places$;
  places$: Observable<Place[]> = this.allPlaces$;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService,
    private placesStore: PlacesStore
  ) { }

  ngOnInit() {
    this.placesService.triggerPlaces();
  }

  onSegmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
    const selectedValue = event.detail.value;

    if(selectedValue === "all") {
      this.places$ = this.allPlaces$;
    } else {
      this.places$ = this.allPlaces$.pipe(
        map(places => {
          const filtered = places.filter(p => {
            return p.userId !== this.authService.userId;
          });
          return filtered;
        })
      );
    }
  }  
}


