import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, RegularShape, Fill}  from 'ol/style';
import { MapService } from 'src/app/map/service/map.service';
import { Stop } from '../../model/stop';
import { StopService } from '../../service/stop.service';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.css']
})
export class StopListComponent implements OnInit {

  private _stops: Array<Stop>;

  constructor(private _stopService: StopService, private _route: ActivatedRoute, private _mapService: MapService) { }

  addStop(latitude: number, longitude: number) {
    
    var style = new Style({
      image: new RegularShape({
        fill: new Fill({color: 'blue'}),
        points: 4,
        radius: 5,
        angle: Math.PI / 4,
      })
    });
    const stop = new Point([latitude, longitude])
    stop.transform('EPSG:4326', 'EPSG:3857');
    var feature = new Feature(stop);
    feature.setStyle(style)

    this._mapService.stopsVectorSource.addFeature(feature);
  }

  getStops(): void {
    if (this._route.snapshot.paramMap) {
      this._stopService.getStops(this._route.snapshot.paramMap.get('stops')).subscribe(value => {
        this._stops = value;
        this._stops.forEach(stop => {
             this.addStop(stop.longitude/3600000.0, stop.latitude/3600000.0);
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
