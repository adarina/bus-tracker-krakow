import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleListComponent } from './vehicle/component/vehicle-list/vehicle-list.component';
import { VehicleSingleComponent } from './vehicle/component/vehicle-single/vehicle-single.component';
import { HttpClientModule } from '@angular/common/http';
import { StopSingleComponent } from './stop/component/stop-single/stop-single.component';
import { StopListComponent } from './stop/component/stop-list/stop-list.component';
import { RouteSingleComponent } from './route/component/route-single/route-single.component';
import { RouteListComponent } from './route/component/route-list/route-list.component';
import { MapComponent } from './map/component/map.component';
import { InfoboxComponent } from './infobox/infobox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    VehicleSingleComponent,
    StopSingleComponent,
    StopListComponent,
    RouteSingleComponent,
    RouteListComponent,
    MapComponent,
    InfoboxComponent
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
  providers: [RouteListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
