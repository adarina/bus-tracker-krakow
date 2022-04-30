import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Map;
  source: XYZ;
  layer: TileLayer<any>;
  view: View;
  stopsVectorSource: VectorSource;
  vehiclesVectorSource: VectorSource;
  stopsVectorLayer: VectorLayer<any>;
  vehiclesVectorLayer: VectorLayer<any>;

  constructor() { }

  setUpMap() {

    const my_point = new Point([19.9458135192313, 50.055499324083485]);
    my_point.transform('EPSG:4326', 'EPSG:3857');

    this.source = new XYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.view = new View(({
      center: my_point.getCoordinates(),
      zoom: 13,
    }));

    this.stopsVectorSource = new VectorSource();

    this.stopsVectorLayer = new VectorLayer({
      source: this.stopsVectorSource
    })
    this.vehiclesVectorSource = new VectorSource();

    this.vehiclesVectorLayer = new VectorLayer({
      source: this.vehiclesVectorSource
    })

    this.layer = new TileLayer({
      source: this.source
    });
    this.map = new Map({
      target: 'map',
      layers: [this.layer, this.stopsVectorLayer, this.vehiclesVectorLayer],
      view: this.view
    });
  }
}
