import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { PlaceLocation } from '../../models/location.model';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
  standalone: false,
})
export class NewOfferPage implements OnInit {

  public offerForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) { 
    this.offerForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      imageUrl: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      availableFrom: ['', [Validators.required]],
      availableTo: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if(!this.offerForm.valid) {
      return;
    }

    const { availableFrom, availableTo } = this.offerForm.value;
    
    const data = {
      ...this.offerForm.value,
      availableFrom: new Date(availableFrom),
      availableTo: new Date(availableTo),
    };
    
    this.placesService.addPlace(data);
    this.offerForm.reset();
    this.navCtrl.navigateBack('/places/offers');
  }

  onLocationPick(location: PlaceLocation) {
    this.offerForm.patchValue({ location: location });
  }

}
