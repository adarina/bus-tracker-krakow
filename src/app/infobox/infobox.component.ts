import { Component, Input, OnInit } from '@angular/core';
import { FeatureLike } from 'ol/Feature';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class InfoboxComponent implements OnInit {

  constructor() { }

  @Input() data: FeatureLike

  ngOnInit(): void {
  }

}
