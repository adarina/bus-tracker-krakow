import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../model/route';
import { RouteService } from '../../service/route.service';
import Polyline from 'ol/format/Polyline';
import LineString from 'ol/geom/LineString';
import { Feature } from 'ol';
import { MapService } from 'src/app/map/service/map.service';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';
import { PathService } from 'src/app/path/service/path.service';
import { Path } from 'src/app/path/model/path';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  private _routes: Array<Route>;
  private _paths: Array<Path>;
  private _route: Route;

  id: string;
  sth: any;

  constructor(private _routeService: RouteService, private _activatedRoute: ActivatedRoute, private _mapService: MapService, private _pathService: PathService) { }

  getRoutes(): void {
    if (this._activatedRoute.snapshot.paramMap) {
      this._routeService.getRoutes(this._activatedRoute.snapshot.paramMap.get('routes')).subscribe(value => {
        this._routes = value;
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }
  }

  getPaths(id: string): void {
    if (this._activatedRoute.snapshot.paramMap) {
      this._pathService.getPaths(this._activatedRoute.snapshot.paramMap.get('paths'), id, "route").subscribe(value => {
        this._paths = value;
        this._paths.forEach(path => {
          this._mapService.addPath(path.color, path.wayPoints)
        })
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }
  }

  getId() {
    this.getRoute(this.id);
    this.getPaths(this.id);
  }

  get paths(): Array<Path> {
    return this._paths;
  }

  get routes(): Array<Route> {
    return this._routes;
  }

  get route(): Route {
    return this._route;
  }

  ngOnInit(): void {
    this._route = new Route(null, null, null);
    this.getRoutes();
  }

  getRoute(id: string): void {
    this._routeService.getRoute(id).subscribe(data => {
      this._route = data;
      console.log(this._route);
      var coordinates = [];
      this._route.stops.forEach(sth => {
        console.log(sth.id, sth.name);
      });

    },
      error => {
        console.log(error);
        console.log(error.status);
        console.log(error.error);
      });
  }
}
