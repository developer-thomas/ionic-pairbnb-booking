import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './models/booking.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: false,
})
export class BookingsPage implements OnInit {

  loadedBookings!: Booking[];

  constructor(
    private bookingService: BookingService,
  ) { }

  ngOnInit() {
    this. loadedBookings = this.bookingService.bookings;
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    // Cancel booking
  }

}
