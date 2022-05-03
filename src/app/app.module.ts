import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/component/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PassageComponent } from './passage/component/passage.component';
import { RouteComponent } from './route/component/route.component';
import { TripComponent } from './trip/component/trip.component';
import { VehicleComponent } from './vehicle/component/vehicle.component';
import { StopComponent } from './stop/component/stop.component';



@NgModule({
  declarations: [
    AppComponent,
    VehicleComponent,
    RouteComponent,
    MapComponent,
    TripComponent,
    StopComponent,
    PassageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule

  ],
  providers: [RouteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
