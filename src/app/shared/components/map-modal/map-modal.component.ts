import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  standalone: false,
})
export class MapModalComponent  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('map') mapElementRef!: ElementRef;
  clickListerner: any;
  googleMaps: any;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.googleMaps.event.removeListener(this.clickListerner);
  }

  ngAfterViewInit() {
    this.getGoogleMaps().then(googleMaps => {
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement
      const map = new googleMaps.Map(mapEl, {
        center: { lat: 40.7484474, lng: -73.9871516 },
        zoom: 16
      });

      this.googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible');
      }); 

      this.clickListerner = map.addListener('click', (event: any) => {
        const selectedCoords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
        this.modalCtrl.dismiss(selectedCoords);
      });

    }).catch(err => {
      console.log(err);
    })
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;

    const googleModule = win.google;

    if(googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD396ouK9QLaYT28JCvsTBkCnLx5cJzWk';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      }
    })
  }
}
