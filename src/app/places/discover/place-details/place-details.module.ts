import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";
import { PlaceDetailsPageRoutingModule } from "./place-details-routing.module";
import { PlaceDetailsPage } from "./place-details.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailsPageRoutingModule
  ],
  declarations: [PlaceDetailsPage, CreateBookingComponent]
})
export class PlaceDetailsPageModule {}
