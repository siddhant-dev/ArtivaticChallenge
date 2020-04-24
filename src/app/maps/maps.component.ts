import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef,  NgZone, SimpleChanges, SimpleChange } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {

  @Input() searchQuery: any[];
  latitude: number;
  longitude: number;
  geoPoint: any[] = [];
  zoom: number;

  constructor(private mapsApiLoader: MapsAPILoader, private zone: NgZone) { }
  @ViewChild('se', {static: false})
  public s: ElementRef;
  map: google.maps.Map;
  ngOnInit() {

    this.mapsApiLoader.load().then(() => {
      this.map = new google.maps.Map(this.s.nativeElement);
      this.latitude = 28.7040592; // default to Delhi
      this.longitude = 77.10249019999999; // default to Delhi
      this.zoom = 3.5;

    });
  }
  ngOnChanges(changes: SimpleChanges) {
      const chng: SimpleChange = changes.searchQuery;
      if (chng.currentValue !== chng.previousValue) {
        this.geoPoint = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.searchQuery.length; i++) {
          const r = `${this.searchQuery[i].City}, ${this.searchQuery[i].State}, ${this.searchQuery[i].District}`;
         
          this.task(r, i);
        }
        // this.getMap();
      }
    }

    task(d, i) {
      setTimeout(() => {
        console.log(i);
        this.getMap(d);
      }, 500 * i);
    }

    getMap(sequery) {

    // console.log(this.searchQuery);
      const r = {
        query: sequery,
        fields: ['name', 'geometry'],
      };
      const autocomplete = new google.maps.places.PlacesService(this.map);
      autocomplete.findPlaceFromQuery(r, (place: any, status) => {
      this.zone.run(() => {
        if ((status === google.maps.places.PlacesServiceStatus.OK)) {
           const la =  place[0].geometry.location.lat();
           const lo =  place[0].geometry.location.lng();
           this.geoPoint.push({lat: la, lon: lo});
        }
      });
        });
  }

  btn() {
    console.log(this.geoPoint);
  }
}
