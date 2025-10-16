import { Injectable } from '@angular/core';
import { Place } from './models/places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place('p1', 'Manhattan Mansion', 'In the heart of New York City.', 'https://www.civitatis.com/f/estados-unidos/nueva-york/guia/manhattan-m.jpg', 149.99),
    new Place('p2', 'L\'Amour Toujours', 'A romantic place in Paris!', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/31/40/0a/96/caption.jpg?w=900&h=500&s=1', 189.99),
    new Place('p3', 'The Foggy Palace', 'Not your average city trip!', 'https://thumbs.dreamstime.com/b/fairytale-neuschwanstein-castle-bavaria-germany-world-famous-tourist-attraction-bavarian-alps-new-swanstone-th-90072395.jpg', 99.99),
  ];

  constructor() {}

  get places() {
    return [...this._places];
  }

  getPlace(placeId: string) {
    return { ...this._places.find(place => place.id === placeId)! };
  }
}
