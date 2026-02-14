import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { GoogleMapsService } from 'src/app/shared/services/google-maps.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Coordinates, PlaceLocation } from 'src/app/places/models/location.model';
import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation';

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
    private googleMapsService: GoogleMapsService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  onPickLocation() {
    this.actionSheetCtrl.create({ header: 'Please choose', buttons: [
      { text: 'Auto-Locate', handler: () => { this.locateUser() } },
      { text: 'Pick on Map', handler: () => { this.openMap() } },
      { text: 'Cancel', role: 'cancel' }
    ]}).then(actionSheetEl => {
      actionSheetEl.present();
      this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
        modalEl.onDidDismiss().then(modalData => {
  
          if(!modalData.data) {
            return;
          }
  
          const coordinates: Coordinates = {
            lat: modalData.data.lat,
            lng: modalData.data.lng
          };
  
          this.createPlace(coordinates.lat, coordinates.lng)
        })
        modalEl.present()
  
      })
    })

  }

  private createPlace(lat: number, lng: number) {
    const pickedLocation: PlaceLocation = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null
    }

    this.isLoading = true;
    this.getAddress(lat, lng).pipe(
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
  }

  private openMap() {
    if(!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
    }

    Geolocation.getCurrentPosition().then(geoPosition => {
      const coordinates: Coordinates = { lat: geoPosition.coords.latitude, lng: geoPosition.coords.longitude };

      this.createPlace(coordinates.lat, coordinates.lng)
    }).catch(err => {
      this.showErrorAlert();
    })
  }


  private locateUser() {
    
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

  
  private showErrorAlert() {
    this.alertCtrl.create({ header: 'Could not fetch location', message: 'Please use the map to pick a location'})
    return
  }
}
