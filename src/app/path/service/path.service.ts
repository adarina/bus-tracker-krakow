import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetPathResponse } from '../dto/get-path-response';
import { Path } from '../model/path';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(private _http: HttpClient) { }

  getPaths(name: string, id: string, type: string): Observable<Array<Path>> {

    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');

    return this._http.get<GetPathResponse>('/internetservice/geoserviceDispatcher/services/pathinfo/' + type + '?id=' + id, { headers }).
      pipe(map(value => {
        let paths = new Array<Path>();
        value.paths.forEach(path => {
          paths.push(new Path(path.color, path.wayPoints));
        })
        return paths;
      }))
  }
}
