import { Component, Input, OnInit } from '@angular/core';
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
