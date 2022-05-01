import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FeatureLike } from 'ol/Feature';
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
    this.map.on('click', (args) => {
      this.map.forEachFeatureAtPixel(args.pixel, (feature, layer) => {
        this.sendData(feature);
      })
    });
  }
}