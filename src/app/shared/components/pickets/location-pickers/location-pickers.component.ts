import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { GoogleMapsService } from 'src/app/shared/services/google-maps.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { PlaceLocation } from 'src/app/places/models/location.model';

@Component({
  selector: 'app-location-pickers',
  standalone: false,
  templateUrl: './location-pickers.component.html',
  styleUrls: ['./location-pickers.component.scss'],
})
export class LocationPickersComponent  implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();

  selectedLocationImage: string | undefined;
  isLoading: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private googleMapsService: GoogleMapsService
  ) { }

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {

        if(!modalData.data) {
          return;
        }

        const pickedLocation: PlaceLocation = {
          lat: modalData.data.lat,
          lng: modalData.data.lng,
          address: null,
          staticMapImageUrl: null
        }
        this.isLoading = true;
        this.getAddress(modalData.data.lat, modalData.data.lng).pipe(
          switchMap(address => {
            pickedLocation.address = address
            return of(this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14));
          })
        ).subscribe({
          next: (staticMapImageUrl) => {
            pickedLocation.staticMapImageUrl = staticMapImageUrl
            this.selectedLocationImage = staticMapImageUrl;
            this.isLoading = false;
            this.locationPick.emit(pickedLocation);
          }
        }) 
      })
      modalEl.present()

    })
  }

  private getAddress(lat: number, lng: number):Observable<any> {
    return this.googleMapsService.getAddress(lat, lng).pipe(
      map(res => {
        return res
      })
    )
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
      &markers=color:red%7Clabel:Place%7C${lat},${lng}
      &key=AIzaSyBD396ouK9QLaYT28JCvsTBkCnLx5cJzWk`
  }
}
