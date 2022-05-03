import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Feature, { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { Fill, Style, Circle } from 'ol/style';
import { timer } from 'rxjs';
import { MapService } from 'src/app/map/service/map.service';
import { Path } from 'src/app/path/model/path';
import { PathService } from 'src/app/path/service/path.service';
import { Vehicle } from '../model/vehicle';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  _vehicles: Array<Vehicle>;
  
  _paths: Array<Path>;

  @Input() data: FeatureLike;

  constructor(private _vehicleService: VehicleService, private _route: ActivatedRoute, private _mapService: MapService, private _pathService: PathService) { }

  addVehicle(latitude: number, longitude: number, id: number, tripId: number, name: string) {

    var style = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'blue' })
      })
    });
    const vehicle = new Point([latitude, longitude])
    vehicle.transform('EPSG:4326', 'EPSG:3857');
    var feature = new Feature(vehicle);
    feature.setStyle(style);
    const vehicleDegree = new Point(vehicle.getCoordinates());
    vehicleDegree.transform('EPSG:3857', 'EPSG:4326');
    feature.setProperties({ 'thing': 'vehicle', 'tripId': tripId, 'id': id, 'name': name, 'longitude': vehicleDegree.getCoordinates()[0], 'latitude': vehicleDegree.getCoordinates()[1] })
    this._mapService.vehiclesVectorSource.addFeature(feature);
  }

  getPaths(id: string): void {
    if (this._route.snapshot.paramMap) {
      this._pathService.getPaths(this._route.snapshot.paramMap.get('paths'), id, "vehicle").subscribe(value => {
        this._paths = value;
        this._paths.forEach(path => {
          this._mapService.addPath(path.color, path.wayPoints)
        })
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }
  }

  getVehicles(): void {
    if (this._route.snapshot.paramMap) {
      this._vehicleService.getVehicles(this._route.snapshot.paramMap.get('vehicles')).subscribe(value => {
        this._vehicles = value;
        this._mapService.vehiclesVectorSource.clear()
        this._vehicles.forEach(vehicle => {
          this.addVehicle(vehicle.longitude / 3600000.0, vehicle.latitude / 3600000.0, vehicle.id, vehicle.tripId, vehicle.name);
        })
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue == undefined) {
      this.data = new Feature(new Point([0, 0]));
    } else {
      this.data = changes.data.currentValue;
      if (this.data.getProperties().thing == "vehicle") {
        this.getPaths(changes.data.currentValue.getProperties().id)
      }
    }
  }
}
