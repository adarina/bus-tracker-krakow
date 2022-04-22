import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Stop } from '../../model/stop';
import { StopService } from '../../service/stop.service';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.css']
})
export class StopListComponent implements OnInit {

  private _stops: Array<Stop>;

  constructor(private _stopService: StopService, private _route: ActivatedRoute) { }

  getStops(): void {
    if (this._route.snapshot.paramMap) {
      this._stopService.getStops(this._route.snapshot.paramMap.get('stops')).subscribe(value => {
        this._stops = value;
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }
  }

  get stops(): Array<Stop> {
    return this._stops;
  }

  ngOnInit(): void {

    let sub = timer(0, 1000).subscribe(timer => {
      this.getStops();
    });

  }
}
