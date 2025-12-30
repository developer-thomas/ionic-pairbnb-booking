import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsService {
    private readonly _apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?'
    private googleKey = 'AIzaSyBD396ouK9QLaYT28JCvsTBkCnLx5cJzWk';

    constructor(
        private httpClient: HttpClient
    ) {}

    getAddress(lat: number, lng: number) {
        return this.httpClient.get(`${this._apiUrl}latlng=${lat},${lng}&key=${this.googleKey}`).pipe(
            map((geoData: any) => {
                if(!geoData || !geoData.results || geoData.results.length === 0) {
                    return null
                }

                return geoData.results[0].formatted_address;
            })
        )
    }

    
}