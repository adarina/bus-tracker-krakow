import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../../model/route';
import { RouteService } from '../../service/route.service';
import { Path } from '../../model/path';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  private _routes: Array<Route>;
  private _paths: Array<Path>;
  private _route: Route;

  selectedItem: string;

  constructor(private _routeService: RouteService, private _activatedRoute: ActivatedRoute) { }

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
          console.log(path.color)
          console.log(path.wayPoints)
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
    this.getRoute(this.selectedItem);
    this.getPaths(this.selectedItem);
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
