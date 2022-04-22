import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleListComponent } from './vehicle/component/vehicle-list/vehicle-list.component';
import { VehicleSingleComponent } from './vehicle/component/vehicle-single/vehicle-single.component';
import { HttpClientModule } from '@angular/common/http';
import { StopSingleComponent } from './stop/component/stop-single/stop-single.component';
import { StopListComponent } from './stop/component/stop-list/stop-list.component';


@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    VehicleSingleComponent,
    StopSingleComponent,
    StopListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
