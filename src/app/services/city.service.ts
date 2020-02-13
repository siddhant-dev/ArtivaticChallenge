import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';
  states: string[] = [];

  constructor(public http: HttpClient) { }

  getStates(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(map((x: any) => {
      x.forEach(element => {
        if( !this.states.includes(element.State)) {
          this.states.push(element.State);
        }
      });
      return this.states.sort() ;
    }));

  }

  getCities(state: string){
    return this.http.get(this.baseUrl + '?State='+ state).pipe(map((x:any) => {
     return x; 
    }))
  }
}
