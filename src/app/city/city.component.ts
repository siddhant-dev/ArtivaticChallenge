import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  states: string[];
  selectState: string;
  city: City[] = [];
  selectCity: City;
  searchInput: string;
  constructor(private service: CityService) {}

  ngOnInit() {
    this.service.getStates().subscribe((payload: string[]) => {
      this.states = payload;
    }
    );
  }

  state(e: any) {
    this.city.length = 0;
    this.selectState = e.target.value;
    this.service.getCities(this.selectState).subscribe((payload: City[]) =>
      this.city = payload

    );
  }

  setCity(e: any) {
    const obj = e.target.value;
    this.selectCity = JSON.parse(obj);
    this.searchInput = `${this.selectCity.City} ,${this.selectCity.District} ,${this.selectCity.State}`;
    // console.log(this.selectCity.City);

  }

}
