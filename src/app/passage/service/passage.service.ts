import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetPassageResponse } from '../dto/get-passage-response';
import { Passage } from '../model/passage';

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  constructor(private _http: HttpClient) { }

  getPassages(shortName: string): Observable<{passages: Array<Passage>, stopName: string, stopShortName: number, routes: any[] }>{

    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    return this._http.get<GetPassageResponse>('/internetservice/services/passageInfo/stopPassages/stop?stop=' + shortName, { headers }).
      pipe(map(value => {
        let passages = new Array<Passage>();
        value.old.forEach(passage => {
          passages.push(new Passage(passage.actualRelativeTime, passage.actualTime, passage.direction, passage.mixedTime,
            passage.passageid, passage.patternText, passage.plannedTime, passage.routeId, passage.status,
            passage.tripId, passage.vehicleId, "old"));
        });
        value.actual.forEach(passage => {
          passages.push(new Passage(passage.actualRelativeTime, passage.actualTime, passage.direction, passage.mixedTime,
            passage.passageid, passage.patternText, passage.plannedTime, passage.routeId, passage.status,
            passage.tripId, passage.vehicleId, "actual"));
        });
        let stopName = value.stopName;
        let stopShortName = value.stopShortName;
        let routes = value.routes;
        return {passages, stopName, stopShortName, routes};
      }));
  }
}
