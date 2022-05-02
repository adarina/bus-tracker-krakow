import { EventEmitter, Injectable, Output } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import { LineString } from 'ol/geom';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import Polyline from 'ol/format/Polyline';
import CircleStyle from 'ol/style/Circle';

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

    // var coordinates = [[19.903361666666665, 49.956147499999986], [19.8972,49.955666388888915], [19.889511944444443,49.95514027777779]];
    // const my_point1 = new Point([19.903361666666665, 49.956147499999986]);
    // my_point1.transform('EPSG:4326', 'EPSG:3857');
    // const my_point2 = new Point([19.889511944444443,49.95514027777779]);
    // my_point2.transform('EPSG:4326', 'EPSG:3857');
    // const route = new Polyline({
    //   factor: 1e6,
    // }).readGeometry(new LineString(coordinates), {
    //   dataProjection: 'EPSG:4326',
    //   featureProjection: 'EPSG:3857',
    // });

    // const routeFeature = new Feature({
    //   type: 'route',
    //   geometry: route,
    // });
    // const startMarker = new Feature({
    //   type: 'icon',
    //   geometry: new Point(my_point1.getCoordinates()),
    // });
    // const endMarker = new Feature({
    //   type: 'icon',
    //   geometry: new Point(my_point2.getCoordinates()),
    // });
    // const position = startMarker.getGeometry().clone();
    // const geoMarker = new Feature({
    //   type: 'geoMarker',
    //   geometry: position,
    // });

    // const styles = {
    //   'route': new Style({
    //     stroke: new Stroke({
    //       width: 6,
    //       color: [237, 212, 0, 0.8],
    //     }),
    //   }),
    //   'icon': new Style({
    //     image: new Icon({
    //       anchor: [0.5, 1],
    //       src: 'data/icon.png',
    //     }),
    //   }),
    //   'geoMarker': new Style({
    //     image: new CircleStyle({
    //       radius: 7,
    //       fill: new Fill({color: 'black'}),
    //       stroke: new Stroke({
    //         color: 'white',
    //         width: 2,
    //       }),
    //     }),
    //   }),
    // };
    // const vectorLayer = new VectorLayer({
    //   source: new VectorSource({
    //     features: [routeFeature, geoMarker, startMarker, endMarker],
    //   }),
    //   style: function (feature) {
    //     return styles[feature.get('type')];
    //   },
    // });

    //map.addLayer(vectorLayer);
   

//     var route = new Feature({
//       type: 'route',
//       geometry: route,
//     });

// var geometry = new Polyline(coordinates);
// geometry.transform('EPSG:4326', 'EPSG:3857'); //Transform to your map projection
// route.setGeometry(geometry);
// //route.setStyle(style)
// this.stopsVectorSource.addFeature(route)

    this.map = new Map({
      target: 'map',
      layers: [this.layer, this.stopsVectorLayer, this.vehiclesVectorLayer],
      view: this.view
    });
  }
}
