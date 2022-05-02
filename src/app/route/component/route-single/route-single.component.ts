
import { Component, Input, OnInit } from '@angular/core';
import { Path } from 'src/app/path/model/path';
import { Route } from '../../model/route';

@Component({
  selector: 'app-route-single',
  templateUrl: './route-single.component.html',
  styleUrls: ['./route-single.component.css']
})
export class RouteSingleComponent implements OnInit {

  private _route: Route;

  private _path: Path;

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

  get path(): Path {
    return this._path;
  }

  @Input()
  set path(path: Path) {
    this._path = path;
  }
}

