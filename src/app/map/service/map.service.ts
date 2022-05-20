import { Injectable } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { LineString } from 'ol/geom';
import { Circle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
import { rotate } from 'ol/transform';

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
  pathsVectorSource: VectorSource;
  stopsVectorLayer: VectorLayer<any>;
  vehiclesVectorLayer: VectorLayer<any>;
  pathsVectorLayer: VectorLayer<any>;

  addPath(color: string, wayPoints: any): void {
    this.pathsVectorSource.clear()

    let coordinates = [];
    wayPoints.forEach((point: { lon: number; lat: number; }) => {
      coordinates.push([point.lon / 3600000.0, point.lat / 3600000.0])
    })
    var path = new LineString(coordinates).transform('EPSG:4326', this.map.getView().getProjection());

    var style = new Style({
      stroke: new Stroke({
        color: color,
        width: 4,
      }),
    });

    var feature = new Feature({
      name: "Path",
      geometry: path
    });

    feature.setStyle(style)
    this.pathsVectorSource.addFeature(feature);
    let tmp = Math.floor(coordinates.length/4);
    const my_point = new Point(coordinates[tmp]);
    my_point.transform('EPSG:4326', 'EPSG:3857');
    
    let newView = new View(({
      center: my_point.getCoordinates(),
      zoom: 13,
    }));
    this.map.setView(newView);
  }

  addStop(latitude: number, longitude: number, id: number, name: string, shortName: string) {
    
    var style = new Style({
      image: new RegularShape({
        fill: new Fill({color: 'blue'}),
        points: 4,
        radius: 8,
        angle: Math.PI / 4,
      }),
      text: new Text({
        text: shortName,
        fill: new Fill({color: 'white'}),
        scale: 0.6,
      })
    });
    const stop = new Point([latitude, longitude])
    stop.transform('EPSG:4326', 'EPSG:3857');
    var feature = new Feature(stop);
    feature.setStyle(style);
    const stopDegree = new Point(stop.getCoordinates())
    stopDegree.transform('EPSG:3857', 'EPSG:4326');
    feature.setProperties({'thing': 'stop', 'id': id, 'name': name, 'longitude': stopDegree.getCoordinates()[0], 'latitude': stopDegree.getCoordinates()[1], 'shortName': shortName})
    this.stopsVectorSource.addFeature(feature);
  }

  addVehicle(latitude: number, longitude: number, id: number, tripId: number, name: string, heading: number) {

    var nameNumber = name.split(" ")[0]
    var style = new Style({
      image: new RegularShape({
        fill: new Fill({color: 'red'}),
        points: 3,
        radius: 11,
        rotation: heading,
        angle: 0,
        scale: [0.75, 1],
      }),
      text: new Text({
        text: nameNumber,
        fill: new Fill({color: 'white'}),
        scale: 0.6,
        offsetY: 1.8,
        rotation: heading,
      })
    });
    const vehicle = new Point([latitude, longitude])
    vehicle.transform('EPSG:4326', 'EPSG:3857');
    var feature = new Feature(vehicle);
    feature.setStyle(style);
    const vehicleDegree = new Point(vehicle.getCoordinates());
    vehicleDegree.transform('EPSG:3857', 'EPSG:4326');
    feature.setProperties({ 'thing': 'vehicle', 'tripId': tripId, 'id': id, 'name': name, 'longitude': vehicleDegree.getCoordinates()[0], 'latitude': vehicleDegree.getCoordinates()[1] })
    this.vehiclesVectorSource.addFeature(feature);
  }

  setUpMap() {

    const my_point = new Point([19.9376, 50.0591]);
    my_point.transform('EPSG:4326', 'EPSG:3857');

    this.source = new XYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.view = new View(({
      center: my_point.getCoordinates(),
      zoom: 14,
    }));

    this.stopsVectorSource = new VectorSource();

    this.stopsVectorLayer = new VectorLayer({
      source: this.stopsVectorSource
    })
    this.vehiclesVectorSource = new VectorSource();

    this.vehiclesVectorLayer = new VectorLayer({
      source: this.vehiclesVectorSource
    })

    this.pathsVectorSource = new VectorSource();

    this.pathsVectorLayer = new VectorLayer({
      source: this.pathsVectorSource
    })

    this.layer = new TileLayer({
      source: this.source
    });

    this.map = new Map({
      target: 'map',
      layers: [this.layer, this.pathsVectorLayer, this.stopsVectorLayer, this.vehiclesVectorLayer],
      view: this.view
    });
  }
}
