import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/models/places.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  standalone: false,
})
export class CreateBookingComponent  implements OnInit {

  @Input() selectedPlace!: Place;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onBookPlace() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onCancel() {
    this.modalCtrl.dismiss({ message: 'Booking cancelled.'}, 'cancel');
  }
}
