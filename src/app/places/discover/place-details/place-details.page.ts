import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetButton, ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/places.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
  standalone: false,
})
export class PlaceDetailsPage implements OnInit {
  place!: Place;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }

      const placeId = paramMap.get('placeId');
      this.place = this.placesService.getPlace(placeId!);
    })
  }

  onBookPlace() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.onOpenModal();
          },
        },
        {
          text: 'Random Date',
          handler: () => {
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
      componentProps: {selectedPlace: this.place}
    })
    .then(modalEl => {
      modalEl.present();
      // on didDismiss é uma outra promise que retorna os dados modal, podemos encadear outro "then" para usar
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log('Usando os dados do modal')
      console.log(resultData.data, resultData.role);
      if(resultData.role === 'confirm') {
        console.log('BOOKED!');
      } else {
        console.log('CANCELLED!');
      }
    });

  }
}
