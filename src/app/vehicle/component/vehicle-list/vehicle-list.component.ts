import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Fill, Style, Circle } from 'ol/style';
import { timer } from 'rxjs';
import { MapService } from 'src/app/map/service/map.service';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../service/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  _vehicles: Array<Vehicle>;

  constructor(private _vehicleService: VehicleService, private _route: ActivatedRoute, private _mapService: MapService) { }

  addVehicle(latitude: number, longitude: number) {
    
    var style = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({color: 'blue'})  
      })
    });
    const vehicle = new Point([latitude, longitude])
    vehicle.transform('EPSG:4326', 'EPSG:3857');
    var feature = new Feature(vehicle);
    feature.setStyle(style)

    this._mapService.vehiclesVectorSource.addFeature(feature);
  }

  getVehicles(): void {
    if (this._route.snapshot.paramMap) {
      this._vehicleService.getVehicles(this._route.snapshot.paramMap.get('vehicles')).subscribe(value => {
        this._vehicles = value;
        this._mapService.vehiclesVectorSource.clear()
        this._vehicles.forEach(vehicle => {
          this.addVehicle(vehicle.longitude/3600000.0, vehicle.latitude/3600000.0);
     })},
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
