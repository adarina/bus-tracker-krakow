import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetStopResponse } from '../dto/get-stop-response';
import { Stop } from '../model/stop';

@Injectable({
  providedIn: 'root'
})
export class StopService {

  constructor(private _http: HttpClient) { }

  getStops(name: string): Observable<Array<Stop>> {
  
    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    
    return this._http.get<GetStopResponse>('/internetservice/geoserviceDispatcher/services/stopinfo/stops?left=-648000000&bottom=-324000000&right=648000000&top=324000000', { headers }).
      pipe(map(value => {
        let stops = new Array<Stop>();
        value.stops.forEach(stop => {
          stops.push(new Stop(stop.id, stop.name, stop.longitude, stop.latitude, stop.shortName));
        })
        return stops;
      }))
  }
}
