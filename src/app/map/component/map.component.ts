import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';

import { MapService } from '../service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: Map;

  constructor(private _mapService: MapService) {}

  ngOnInit() {
    this._mapService.setUpMap();
    this.map = this._mapService.map;
  }
}