import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { CityService } from './services/city.service';
import {FormsModule} from '@angular/forms';
import { MapsComponent } from './maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ['places']
    }),
  ],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
