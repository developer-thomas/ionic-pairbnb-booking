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
    private _onePlaceSubject = new BehaviorSubject<Place>({ } as Place);
    
    
    public onePlace$ = this._onePlaceSubject.asObservable();
    public places$ = this._placesSubject.asObservable();

    public setPlaces(places: Place[]) {
        this._placesSubject.next(places);
    }

    setOnePlace(place: Place) {
        this._onePlaceSubject.next(place);
    }

    public bookablePlaces(places: Place[]) {
        this._placesSubject.next(places)
    }

    public addOnePlace(place: Place) {
        const currentPlaces = this._placesSubject.value;
        this._placesSubject.next([...currentPlaces, place]);
    }

    // CRUD
    public addPlace(place: Place) {
        const currentPlaces = this._placesSubject.value;
        this._placesSubject.next([...currentPlaces, place]);
    }

    public removePlace(placeId: number) {
        const currentPlace = this._placesSubject.value;
        this._placesSubject.next(currentPlace.filter((p) => p.id !== placeId))
    }
}