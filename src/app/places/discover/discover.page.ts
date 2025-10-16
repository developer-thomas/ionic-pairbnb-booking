import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/places.model';
import { SegmentChangeEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: false,
})
export class DiscoverPage implements OnInit {

  loadedPlaces: Place[] = [];
  slicedLoadedPlaces: Place[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.slicedLoadedPlaces = this.placesService.places.slice(1);
  }

  onSegmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail.value);
  }
}
