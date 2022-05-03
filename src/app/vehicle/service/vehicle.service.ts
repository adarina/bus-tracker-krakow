import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetVehicleResponse } from '../dto/get-vehicle-response';
import { Vehicle } from '../model/vehicle';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http: HttpClient) { }

  getVehicles(name: string): Observable<Array<Vehicle>> {
  
    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    
    return this._http.get<GetVehicleResponse>('/internetservice/geoserviceDispatcher/services/vehicleinfo/vehicles', { headers }).
      pipe(map(value => {
        let vehicles = new Array<Vehicle>();
        value.vehicles.forEach(vehicle => {
          if (vehicle.isDeleted != true) {
            vehicles.push(new Vehicle(vehicle.tripId, vehicle.id, null, vehicle.name, vehicle.longitude, vehicle.latitude, null));
          }
        })
        return vehicles;
      }))
  }

  // http://91.223.13.70/internetservice/geoserviceDispatcher/services/pathinfo/vehicle?id=-1152921493138099682
}
