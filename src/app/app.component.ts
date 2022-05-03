import { Component, Input } from '@angular/core';
import { FeatureLike } from 'ol/Feature';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data: FeatureLike

  dataFromRoute: string

  appDataRoute(event: string) {
    this.dataFromRoute = event;
    console.log(this.dataFromRoute)
  }

  appData(event: FeatureLike) {
    this.data = event;
  }
  title = 'bus-tracker-krakow';
}
