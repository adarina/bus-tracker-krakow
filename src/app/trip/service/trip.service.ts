import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetTripResponse } from '../dto/get-trip-response';
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private _http: HttpClient) { }

  getTrips(tripId: string, id: string): Observable<{ trips: Array<Trip>, directionText: string, routeName: number }> {

    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');

    return this._http.get<GetTripResponse>('/internetservice/services/tripInfo/tripPassages?tripId=' + tripId + '&vehicleId=' + id, { headers }).
      pipe(map(value => {
        let trips = new Array<Trip>();
        value.old.forEach(trip => {
          trips.push(new Trip(trip.actualTime, trip.status, trip.stop, trip.stop_seq_num, "old"));
        });
        value.actual.forEach(trip => {
          trips.push(new Trip(trip.actualTime, trip.status, trip.stop, trip.stop_seq_num, "actual"));
        });
        let directionText = value.directionText;
        let routeName = value.routeName;
        
        return { trips, directionText, routeName };
      }));
  }
}
