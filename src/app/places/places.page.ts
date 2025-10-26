import { Component, OnInit } from '@angular/core';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
  standalone: false,
})
export class PlacesPage implements OnInit {

  constructor(
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.placesService.triggerPlaces()
  }

}
