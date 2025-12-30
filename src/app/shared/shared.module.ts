import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationPickersComponent } from './components/pickets/location-pickers/location-pickers.component';
import { MapModalComponent } from './components/map-modal/map-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [LocationPickersComponent, MapModalComponent],
  declarations: [LocationPickersComponent, MapModalComponent]
})
export class SharedModule {}
