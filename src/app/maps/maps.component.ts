import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef,  NgZone, SimpleChanges, SimpleChange } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() searchQuery: string;
  latitude: number;
  longitude: number;
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
        this.getMap();
      }
    }

    getMap() {
    // console.log(this.searchQuery);

    const r = {
        query: this.searchQuery,
        fields: ['name', 'geometry'],
      };
    const autocomplete = new google.maps.places.PlacesService(this.map);
    autocomplete.findPlaceFromQuery(r, (place: any, status) => {
      this.zone.run(() => {
        if ((status === google.maps.places.PlacesServiceStatus.OK)) {
          this.latitude = place[0].geometry.location.lat();
          this.longitude = place[0].geometry.location.lng();
          this.zoom = 12;
        }
      });
        });
  }
}
