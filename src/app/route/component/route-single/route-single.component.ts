import { Component, Input, OnInit } from '@angular/core';
import { Route } from '../../model/route';

@Component({
  selector: 'app-route-single',
  templateUrl: './route-single.component.html',
  styleUrls: ['./route-single.component.css']
})
export class RouteSingleComponent implements OnInit {

  private _route: Route;

  id: number;

  name: string;


  constructor() { }

  ngOnInit(): void {
  }

  get route(): Route {
    return this._route;
  }

  @Input()
  set route(route: Route) {
    this._route = route;
  }

}

