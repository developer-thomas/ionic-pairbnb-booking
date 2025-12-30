import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Place } from "../../models/places.model";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class PlacesStore {

    constructor(
        private authService: AuthService
    ) {}

    private _placesSubject = new BehaviorSubject<Place[]>([]);
    private _onePlaceSubject = new BehaviorSubject<Place>({} as Place);
    private _userOffers = new BehaviorSubject<Place[]>([]);
    
    
    public onePlace$ = this._onePlaceSubject.asObservable();
    public places$ = this._placesSubject.asObservable();
    public userOffers$ = this._userOffers.asObservable();

    public setPlaces(places: Place[]) {
        this._placesSubject.next(places);
    }

    setOnePlace(place: Place) {
        this._onePlaceSubject.next(place);
    }

    public bookablePlaces(places: Place[]) {
        this._placesSubject.next(places)
    }

    public setUserOffers(places: Place[]) {
        this._userOffers.next(places);
    }

    // CRUD
    public addPlace(place: Place) {
        const currentPlaces = this._placesSubject.value;
        this._placesSubject.next([...currentPlaces, place]);
    }

    public addOnePlace(place: Place) {
        const currentPlaces = this._placesSubject.value;
        this._placesSubject.next([...currentPlaces, place]);
    }

    public removePlace(placeId: number) {
        const currentPlace = this._placesSubject.value;
        this._placesSubject.next(currentPlace.filter((p) => p.id !== placeId))
    }

    
}