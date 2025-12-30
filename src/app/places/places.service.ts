import { DestroyRef, Injectable } from '@angular/core';
import { Place } from './models/places.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlacesStore } from './discover/store/places.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface PlaceData {
  availableFrom: string,
  availableTo: string,
  description: string, 
  imageUrl: string, 
  price: number,
  title: string, 
  userId: string,
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private readonly _apiUrl = environment.api;

  // private _places = new BehaviorSubject<Place[]>([]);
  public places$ = this.placesStore.places$;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private placesStore: PlacesStore,
    private destroyRef: DestroyRef
  ) {}

  /**
   * Triga todos os lugares e aloca no store
   */
  public triggerPlaces() {
    return this.httpClient.get<Place[]>(`${this._apiUrl}/places`).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).
    subscribe({
      next: (places) => {
        this.placesStore.setPlaces(places);
      }
    })
  } 

  get places() {
    return this.places$;
  }
  
  /**
   * Trigga para pegar um lugar e alocar no store
   */
  public getPlace(placeId: number) {
    return this.httpClient.get<Place>(`${this._apiUrl}/places/${placeId}`).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (place) => {
        this.placesStore.setOnePlace(place);
      }
    })
  }

  public addPlace(place: Place) {
    const newPlace = {
      ...place,
      userId: this.authService.userId,
    };

    return this.httpClient.post<Place>(`${this._apiUrl}/places`, newPlace).subscribe({
      next: (place) => {
        this.placesStore.addOnePlace(place);
      }
    })
  }

  public updatePlace(placeId: number, place:Place) {
    const placeToUpdate = {
      ...place,
      imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/40/0a/96/caption.jpg?w=900&h=500&s=1',
      userId: this.authService.userId,
    }

    return this.httpClient.patch<Place>(`${this._apiUrl}/places/${placeId}`, placeToUpdate).subscribe({
      next: (res) => {
        this.placesStore.addPlace(res)
      }
    })
  }

  public listUserOffers() {
    const userId = this.authService.userId;

    return this.httpClient.get<Place[]>(`${this._apiUrl}/places/user/${userId}`).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.placesStore.setUserOffers(res);
      }
    }
    )
  } 
}
