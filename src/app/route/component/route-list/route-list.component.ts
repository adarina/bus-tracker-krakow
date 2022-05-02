import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../model/route';
import { RouteService } from '../../service/route.service';
import { Path } from '../../model/path';
import Polyline from 'ol/format/Polyline';
import LineString from 'ol/geom/LineString';
import { Feature } from 'ol';
import { MapService } from 'src/app/map/service/map.service';
import { Fill, RegularShape, Stroke, Style } from 'ol/style';

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

  constructor(private _routeService: RouteService, private _activatedRoute: ActivatedRoute, private _mapService: MapService) { }

  addPath(color: string, wayPoints: any): void {
    this._mapService.pathsVectorSource.clear()

    var coordinates = [];
    wayPoints.forEach((point: { lon: number; lat: number; }) => {
      coordinates.push([point.lon / 3600000.0, point.lat / 3600000.0])
    })
    var path = new LineString(coordinates).transform('EPSG:4326', this._mapService.map.getView().getProjection());

    var style = new Style({
      stroke: new Stroke({
        color: color,
        width: 4,
      }),
    });

    var feature = new Feature({
      name: "Path",
      geometry: path
    });

    feature.setStyle(style)
    this._mapService.pathsVectorSource.addFeature(feature);
  }

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
      this._routeService.getPaths(this._activatedRoute.snapshot.paramMap.get('paths'), id).subscribe(value => {
        this._paths = value;
        this._paths.forEach(path => {
          this.addPath(path.color, path.wayPoints)
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

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoute(id: string): void {
    this._routeService.getRoute(id).subscribe(data => {
      this._route = data;
      console.log(this._route.stops);
    },
      error => {
        console.log(error);
        console.log(error.status);
        console.log(error.error);
      });
  }
}
