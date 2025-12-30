import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/places.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlacesStore } from '../../discover/store/places.store';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  standalone: false,
})
export class EditOfferPage implements OnInit {

  private placeId!: number;

  public place!: Place;
  public offerForm!: FormGroup;

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private loadingController: LoadingController,
    private placesStore: PlacesStore
  ) { 
    this.offerForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      price: ['', [Validators.required, Validators.min(1)]],
      availableFrom: ['', [Validators.required]],
      availableTo: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }

      this.placeId = Number(paramMap.get('placeId'));

      this.placesService.getPlace(this.placeId);

      this.placesStore.onePlace$.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (place) => {
          this.place = place!;
          this.loadForm(this.place);
        }
      })
    })
  }

  loadForm(place: any) {
    this.offerForm.patchValue({
      title: place.title,
      description: place.description,
      price: place.price,
      availableFrom: place.availableFrom,
      availableTo: place.availableTo,
    });
  }

  onSubmit() {
    if(!this.offerForm.valid) {
      return;
    }
    this.loadingController.create({ message: 'Updating place...' }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
          
        const form = {
          ...this.offerForm.value,
          availableFrom: this.offerForm.value.dateFrom,
          availableTo: this.offerForm.value.dateTo,
        }
        
        this.placesService.updatePlace(this.placeId, form);
        this.navCtrl.navigateBack('/places/offers');
   
        loadingEl.dismiss();
      }, 1500);
    });

  }

}
