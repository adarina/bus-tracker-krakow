import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import Map from 'ol/Map';

import { MapService } from '../service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: Map;

  @Output() send = new EventEmitter<FeatureLike>();

  sendData(data: FeatureLike) {
    this.send.emit(data)
  }

  constructor(private _mapService: MapService) { }

  ngOnInit() {
    this._mapService.setUpMap();
    this.map = this._mapService.map;
    this.sendData(new Feature(new Point([0, 0])));
    this.map.on('click', (args) => {
      this.map.forEachFeatureAtPixel(args.pixel, (feature, layer) => {
        this._mapService.pathsVectorSource.clear();
        this.sendData(feature);
      })
    });
  }
}