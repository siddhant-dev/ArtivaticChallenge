import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';
  states: string[] = [];

  constructor(public http: HttpClient) { }

  getStates(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(map((x: City[]) => {
      x.forEach( (element: City) => {
        if ( !this.states.includes(element.State)) {
          this.states.push(element.State);
        }
      });
      return this.states.sort() ;
    }));

  }

  getCities(state: string) {
    const city = [];
    return this.http.get(this.baseUrl + '?State_like=' + state).pipe(map((x: City[]) => {
      x.forEach((el: City) => {
        if (el.State === state) {
          city.push(el);
        }
      });
      return city;
    }));
  }
}
