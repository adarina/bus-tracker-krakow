import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetRouteResponse } from '../dto/get-route-response';
import { Route } from '../model/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private _http: HttpClient) { }

  getRoutes(name: string): Observable<Array<Route>> {

    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
   
    return this._http.get<GetRouteResponse>('/internetservice/services/routeInfo/route', { headers }).
      pipe(map(value => {
        let routes = new Array<Route>();
        value.routes.forEach(route => {
        routes.push(new Route(route.id, route.name, route.stops));
        });
        return routes;
      }));
  }

  getRoute(id: string): Observable<Route> {
    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    return this._http.get<Route>('/internetservice/services/routeInfo/routeStops?routeId=' + id, { headers })
  }
}
