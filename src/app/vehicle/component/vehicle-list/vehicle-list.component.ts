import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private _vehicles: Array<Vehicle>;

  constructor(private _vehicleService: VehicleService, private _route: ActivatedRoute) { }

  getVehicles(): void {
    if (this._route.snapshot.paramMap) {
      this._vehicleService.getVehicles(this._route.snapshot.paramMap.get('vehicles')).subscribe(value => {
        this._vehicles = value;
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }
  }

  get vehicles(): Array<Vehicle> {
    return this._vehicles;
  }

  


  ngOnInit(): void {

    let sub = timer(0, 1000).subscribe(timer => {
      this.getVehicles();
    });
    
  }

}
