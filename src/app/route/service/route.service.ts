import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetRouteResponse } from '../dto/get-route-response';
import { GetWayResponse } from '../dto/get-way-response';
import { Route } from '../model/route';
import { Way } from '../model/way';

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

  getWays(name: string, id: string): Observable<Array<Way>> {

    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
   
    return this._http.get<GetWayResponse>('/internetservice/geoserviceDispatcher/services/pathinfo/route?id=' + id, { headers }).
      pipe(map(value => {
        let ways = new Array<Way>();
        value.ways.forEach(way => {
          ways.push(new Way(way.color, way.wayPoints));
        });
        return ways;
      }));
  }

  

  getRoute(id: string): Observable<Route> {
    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    return this._http.get<Route>('/internetservice/services/routeInfo/routeStops?routeId=' + id, { headers })
  }

  getWay(id: string): Observable<Way> { 
    let headers = new HttpHeaders();
    headers = headers.set('Data-Type', 'json');
    return this._http.get<Way>('/internetservice/geoserviceDispatcher/services/pathinfo/route?id=' + id, { headers })

   // http://91.223.13.70/internetservice/geoserviceDispatcher/services/pathinfo/route?id=8095257447305838596
  }

}
