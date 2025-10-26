import { DestroyRef, Injectable } from '@angular/core';
import { Booking } from './models/booking.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BookingsStore } from './store/bookings.store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '../shared/services/snackbar';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly _apiUrl = environment.api;

  private _userBookings = this.bookingsStore.userBookings$;
    
  constructor(
    private httpClient: HttpClient,
    private bookingsStore: BookingsStore,
    private destroyRef: DestroyRef,
    private snackBarService: SnackbarService

  ) { }

  get userBookings(): Observable<Booking[]> {
    return this._userBookings;
  }

  createBooking(place: Booking) {
    return this.httpClient.post<Booking>(`${this._apiUrl}/bookings`, place).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (booking) => {
        this.bookingsStore.setNewBooking(booking);
        this.snackBarService.sucess('Booking created sucessfully.')
      },
      error: (err) => {
        this.snackBarService.error('Error!', err);
        this.bookingsStore.setLoading(false)
      },
      complete: () => {
        this.bookingsStore.setLoading(false)
      }
    })
  }

  removeBooking(bookingId: string) {
    // const bookings = this._userBookings.value;

    // const updatedBookings = bookings.filter(b => b.id !== bookingId);

    // this._userBookings.next([...updatedBookings])
  }

  findBookingPerUser(userId: number) {
    return this.httpClient.get<Booking[]>(`${this._apiUrl}/bookings/user/${userId}`).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.bookingsStore.setUserBooking(res);
      }
    })
  }

  
}
