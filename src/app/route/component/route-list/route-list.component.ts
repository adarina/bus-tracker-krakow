import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Route } from '../../model/route';
import { RouteService } from '../../service/route.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { Way } from '../../model/way';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  private _routes: Array<Route>;
  private _route: Route;
  private _ways: Array<Way>;
  private _way: Way;

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

  getWays(id: string): void {
    if (this._activatedRoute.snapshot.paramMap) {
      this._routeService.getWays(this._activatedRoute.snapshot.paramMap.get('paths'), id).subscribe(value => { 
        this._ways = value;
        console.log(this._way.color);
        console.log(this._way.wayPoints);
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
      this.getWays(this.selectedItem);

  }

  get routes(): Array<Route> {
    return this._routes;
  }

  get ways(): Array<Way> {
    return this._ways;
  }

  ngOnInit(): void {
      this.getRoutes();
      //this.getRoute("8095257447305838593");
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

  // getWay(id: string): void {
  //   this._routeService.getWay(id).subscribe(data => {
  //     this._way = data;
  //     console.log(this._way.paths);
  //   },
  //     error => {
  //       console.log(error);
  //       console.log(error.status);
  //       console.log(error.error);
  //     });
  // }
}
