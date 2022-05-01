import { Component, Input } from '@angular/core';
import { FeatureLike } from 'ol/Feature';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: FeatureLike

  appData(event: FeatureLike) {
    this.data = event;
  }
  title = 'bus-tracker-krakow';
}
