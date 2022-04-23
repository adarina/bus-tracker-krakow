import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Route } from '../../model/route';
import { RouteService } from '../../service/route.service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  private _routes: Array<Route>;
  private _route: Route;

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

  get routes(): Array<Route> {
    return this._routes;
  }

  ngOnInit(): void {
      this.getRoutes();
      this.getRoute("8095257447305838593");
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
