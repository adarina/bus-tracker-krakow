import { Component, Input, OnInit } from '@angular/core';

import Point from 'ol/geom/Point';
import Projection from 'ol/proj/Projection';
import { Vehicle } from '../../model/vehicle';

@Component({
  selector: 'app-vehicle-single',
  templateUrl: './vehicle-single.component.html',
  styleUrls: ['./vehicle-single.component.css']
})
export class VehicleSingleComponent implements OnInit {

  private _vehicle: Vehicle;

  id: number;

  name: string;

  _longitude: number;
    
  _latitude: number;

  _point: Point;

  constructor() { }

  ngOnInit(): void {
  }

  get vehicle(): Vehicle {
    // const my_point = new Point([this._vehicle.latitude/3600000.0, this._vehicle.longitude/3600000.0]);
    // my_point.transform('EPSG:4326', 'EPSG:3857');
    // this._point = my_point;
    return this._vehicle;
  }

  @Input()
  set vehicle(vehicle: Vehicle) {
    this._vehicle = vehicle;
  }
}
