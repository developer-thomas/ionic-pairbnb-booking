import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Booking } from "../models/booking.model";

@Injectable({
    providedIn: 'root'
})
export class BookingsStore {
    constructor() {}

    private _bookings = new BehaviorSubject<Booking[]>([]);
    private _loading = new BehaviorSubject<boolean>(false);
    private _userBookings = new BehaviorSubject<Booking[]>([]);

    public bookings$ = this._bookings.asObservable();
    public loading$ = this._loading.asObservable();
    public userBookings$ = this._userBookings.asObservable();

    setNewBooking(booking: Booking) {
        const bookings = this._bookings.value;
        this._bookings.next([...bookings, booking])
    }

    setLoading(isLoading: boolean) {
        this._loading.next(isLoading);
    }

    setUserBooking(bookings: Booking[]) {
        this._userBookings.next(bookings)
    }



}