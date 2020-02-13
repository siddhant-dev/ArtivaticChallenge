import { Component, OnInit } from '@angular/core';
import { CityService } from './services/city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'artivatic';
  states: string[];
  selectState: string;
  city: any;
  selectCity: any;
  constructor(private service: CityService) {}

  ngOnInit() {
    this.service.getStates().subscribe((payload: any) => {
      this.states = payload;
    }
    );
  }

  state(e){
    console.log(this.selectState)
    this.selectState = e.target.value;
    console.log(this.selectState)
    this.service.getCities(this.selectState).subscribe((payload: any)=> 
      this.city = payload
    )
  }

  setCity(e){
    this.selectCity = e.target.value;
    console.log(this.selectCity);
  }

    
}
