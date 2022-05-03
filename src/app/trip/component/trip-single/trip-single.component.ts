import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Feature, { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import { Stop } from 'src/app/stop/model/stop';
import { Trip } from '../../model/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trip-single',
  templateUrl: './trip-single.component.html',
  styleUrls: ['./trip-single.component.css']
})
export class TripSingleComponent implements OnInit {

  private _trip: Trip;

  private _trips: Array<Trip>;

  private _directionText: string;

  private _routeName: number;

  @Input() data: FeatureLike;

  constructor(private _activatedRoute: ActivatedRoute, private _tripService: TripService) { }

  getTrips(tripId: string, id: string): void {
    if (this._activatedRoute.snapshot.paramMap) {
      this._tripService.getTrips(tripId, id).subscribe(value => {
        this._trips = value.trips;
        this._directionText = value.directionText;
        this._routeName = value.routeName;
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue == undefined) {
      this.data = new Feature(new Point([0, 0]));
    } else {
      this.data = changes.data.currentValue;
      if (this.data.getProperties().thing == "vehicle") {
        // console.log(changes.data.currentValue.getProperties().tripId, changes.data.currentValue.getProperties().id)
        this.getTrips(this.data.getProperties().tripId, this.data.getProperties().id);
      } 
    }
  }

  ngOnInit(): void {
  }

  get trip(): Trip {
    return this._trip;
  }

  @Input()
  set trip(trip: Trip) {
    this._trip = trip;
  }

  get trips(): Array<Trip> {
    return this._trips;
  }

  get directionText(): string {
    return this._directionText;
  }

  get routeName(): number {
    return this._routeName;
  }
}
