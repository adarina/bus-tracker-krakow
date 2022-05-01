import { Component, Input, OnInit } from '@angular/core';
import { FeatureLike } from 'ol/Feature';

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

  constructor() { }

  ngOnInit(): void {
  }

  get vehicle(): Vehicle {
    return this._vehicle;
  }

  @Input()
  set vehicle(vehicle: Vehicle) {
    this._vehicle = vehicle;
  }
}
