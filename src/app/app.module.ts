import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { CityService } from './services/city.service';
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
