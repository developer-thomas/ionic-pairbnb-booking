import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";
import { PlaceDetailsPageRoutingModule } from "./place-details-routing.module";
import { PlaceDetailsPage } from "./place-details.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailsPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
],
  declarations: [PlaceDetailsPage, CreateBookingComponent]
})
export class PlaceDetailsPageModule {}
