import { Component, OnInit, OnDestroy } from '@angular/core';
import { CityService } from '../services/city.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {
  states: string[];
  selectState: string;
  city: City[] = [];
  selectCity: City;
  searchInput: string;
  sub: Subscription;
  sub2: Subscription;
  constructor(private service: CityService) {}

  ngOnInit() {
    this.sub = this.service.getStates().subscribe((payload: string[]) => {
      this.states = payload;
    }
    );
  }

  state(e: any) {
    this.city.length = 0;
    this.selectState = e.target.value;
    this.sub2 = this.service.getCities(this.selectState).subscribe((payload: City[]) =>
      this.city = payload

    );
  }

  setCity(e: any) {
    const obj = e.target.value;
    this.selectCity = JSON.parse(obj);
    this.searchInput = `${this.selectCity.City} ,${this.selectCity.District} ,${this.selectCity.State}`;
    // console.log(this.selectCity.City);

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
