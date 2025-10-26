import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/models/places.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  standalone: false,
})
export class CreateBookingComponent  implements OnInit {

  form!: FormGroup;

  @Input() selectedPlace!: Place;
  @Input() selectedMode!: 'select' | 'random';

  startDate!: string;
  endDate!: string;

  totalPrice!: number;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      numberOfGuests: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    if(this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() + 
          Math.random() * 
            (availableTo.getTime() 
              - 7 * 24 * 60 * 60 * 1000 - 
              availableFrom.getTime())
      ).toISOString();

      this.endDate =
        new Date(
          new Date(this.startDate).getTime() + 
        Math.random() * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())
      ).toISOString();
    }

    if(this.startDate && this.endDate) {
      this.form.patchValue({
        startDate: this.startDate,
        endDate: this.endDate,
      })
    }
  }


  onBookPlace() {
    if(!this.form.valid && !this.datesValid()) {
      return;
    }

    const totalPrice = this.getQuantityDays() * this.selectedPlace.price

    const formData = {
      ...this.form.value,
      totalPrice,
    }
    
    // No método abaixo posso passar os valores do formulário no primeiro argumento
    // E o método que chama esse modal, receberá os dados enviados daqui e fará o que quiser com ele
    this.modalCtrl.dismiss(formData, 'confirm')
  }

  onCancel() {
    this.modalCtrl.dismiss({ message: 'Booking cancelled.'}, 'cancel');
  }

  private getQuantityDays() {

    const { startDate, endDate } = this.form.value;

    const from = new Date(startDate);
    const to = new Date(endDate);

    const fromUTC = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
    const toUTC = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());

    const diffInMs = toUTC - fromUTC;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;

  }

  datesValid() {
    const { startDate, endDate } = this.form.value;

    if(startDate > endDate) {
      return false;
    }

    return true
  }

  get getTotalPrice() {
    const totalPrice = this.getQuantityDays() * this.selectedPlace.price
    return totalPrice
  }
}
