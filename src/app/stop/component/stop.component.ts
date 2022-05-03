import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapService } from 'src/app/map/service/map.service';
import { Stop } from '../model/stop';
import { StopService } from '../service/stop.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

  private _stops: Array<Stop>;

  constructor(private _stopService: StopService, private _route: ActivatedRoute, private _mapService: MapService) { }

  getStops(): void {
    if (this._route.snapshot.paramMap) {
      this._stopService.getStops(this._route.snapshot.paramMap.get('stops')).subscribe(value => {
        this._stops = value;
        this._stops.forEach(stop => {
             this._mapService.addStop(stop.longitude/3600000.0, stop.latitude/3600000.0, stop.id, stop.name, stop.shortName);
        })
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }
  }

  get stops(): Array<Stop> {
    return this._stops;
  }

  ngOnInit(): void {
    this.getStops();
  }
}
