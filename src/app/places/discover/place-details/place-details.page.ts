import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/places.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { BookingService } from 'src/app/bookings/booking.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PlacesStore } from '../store/places.store';
import { map, Observable } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/components/map-modal/map-modal.component';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
  standalone: false,
})
export class PlaceDetailsPage implements OnInit {
  isBookable: boolean = true;
  currentPlace!: Place;
  selectedMode!: 'select' | 'random';
  placeId!: number;
  onePlace$: Observable<Place> = this.placesStore.onePlace$;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private placesStore: PlacesStore
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }

      this.placeId = Number(paramMap.get('placeId'));
      
      this.placesService.getPlace(this.placeId)
    })
  }

  ionViewWillEnter() {
    this.placesStore.onePlace$.subscribe({
      next: (place) => {
        if(place) {
          this.currentPlace = place;   
          this.isBookable = place.userId !== this.authService.userId;
        }
      }
    })
  }

  onBookPlace() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.selectedMode = 'select';
            this.onOpenModal();
          },
        },
        {
          text: 'Random Date',
          handler: () => {
            this.selectedMode = 'random';
            this.onOpenModal();
          },
        },
        {
          text: 'Cancel',
          role: 'destructive',
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    })
  }


  onOpenModal() {
    this.modalCtrl.create({
      component: CreateBookingComponent, 
      componentProps: { selectedPlace: this.currentPlace, selectedMode: this.selectedMode }
    })
    .then(modalEl => {
      modalEl.present();
      // on didDismiss é uma outra promise que retorna os dados modal, podemos encadear outro "then" para usar
      return modalEl.onDidDismiss();
    }).then(resultData => {
      
      if(resultData.role === 'confirm') {

        this.loadingCtrl.create({
          message: 'Creating...',

        }).then(loadingEl => {
          loadingEl.present()
          
          const data = {
            ...resultData.data,
            placeId: this.placeId,
            userId: this.authService.userId
          }
  
          this.bookingService.createBooking(data)
          return loadingEl.dismiss();
        })
        
        
      } else {
        console.log('CANCELLED!');
      }
    })
  }

  onShowFullMap() {
    this.modalCtrl.create({
      component: MapModalComponent,
      componentProps: {
        center: { lat: this.currentPlace.placeLocation?.lat, lng: this.currentPlace.placeLocation?.lng },
        selectable: false,
        closeButtonText: 'Close',
        title: this.currentPlace.title
      }
    }).then(modalEl => {
      modalEl.present();
    })
  }
}
