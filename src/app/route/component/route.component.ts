import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feature } from 'ol';
import { MapService } from 'src/app/map/service/map.service';
import { PathService } from 'src/app/path/service/path.service';
import { Path } from 'src/app/path/model/path';
import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { Route } from '../model/route';
import { RouteService } from '../service/route.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  private _routes: Array<Route>;
  private _paths: Array<Path>;
  private _route: Route;
  private _id: string;

  @Input() data: FeatureLike;

  @Output() send = new EventEmitter<FeatureLike>();

  sendData(data: FeatureLike) {
    this.send.emit(data)
  }

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
    var feature = new Feature(new Point([0, 0]))
    feature.setProperties({ 'thing': 'line' })
    this.sendData(feature);
    this.getRoute(this._id);
    this.getPaths(this._id);
  }

  ngOnChanges(changes: SimpleChanges) {

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

  @Input()
  set id(id: string) {
    this._id = id;
  }

  ngOnInit(): void {
    this._route = new Route(null, null, null, undefined);
    this.getRoutes();
  }

  getRoute(id: string): void {
    this._routeService.getRoute(id).subscribe(data => {
      this._route = data;
    },
      error => {
        console.log(error);
        console.log(error.status);
        console.log(error.error);
      });
  }
}