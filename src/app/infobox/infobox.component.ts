import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Data } from '@angular/router';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class InfoboxComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() data: FeatureLike;


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue == undefined) {
      this.data = new Feature(new Point([0, 0]));
    } else {
      this.data = changes.data.currentValue;
    }
  }
}
