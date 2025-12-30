import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './models/booking.model';
import { IonItemSliding } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: false,
})
export class BookingsPage implements OnInit {

  userBookings$: Observable<Booking[]> = this.bookingService.userBookings;


  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.triggerUserBookings()
  }
  
  triggerUserBookings() {
  
    this.bookingService.findBookingPerUser(this.authService.userId)
  }

  onCancelBooking(bookingId: number, slidingItem: IonItemSliding) {
    slidingItem.close();

    this.bookingService.removeBooking(bookingId);
  }

}
