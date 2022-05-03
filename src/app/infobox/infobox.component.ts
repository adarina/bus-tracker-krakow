import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Passage } from '../passage/model/passage';
import { PassageService } from '../passage/service/passage.service';
import { TripSingleComponent } from '../trip/component/trip-single/trip-single.component';
import { Trip } from '../trip/model/trip';
import { TripService } from '../trip/service/trip.service';

@Component({
  selector: 'app-infobox',
  templateUrl: './infobox.component.html',
  styleUrls: ['./infobox.component.css']
})
export class InfoboxComponent implements OnInit, OnChanges {

  constructor(private _tripService: TripService, private _tripSingleComponent: TripSingleComponent, private _passageService: PassageService, private _activatedRoute: ActivatedRoute) { }

   @Input() data: FeatureLike;

  // private _trips: Array<Trip>;

  // private _passages: Array<Passage>;

  // private _trip: Trip;

  // private _passage: Passage;

  // // private _directionText: string;

  // // private _routeName: number;

  // private _stopName: string;

  // private _stopShortName: number;

  //private _sth: any;

  // getTrips(tripId: string, id: string): void {
  //   if (this._activatedRoute.snapshot.paramMap) {
  //     this._tripService.getTrips(tripId, id).subscribe(value => {
  //       this._trips = value.trips;
  //       this._directionText = value.directionText;
  //       this._routeName = value.routeName;
  //     },
  //       error => {
  //         console.log(error);
  //         console.log(error.status);
  //         console.log(error.error);
  //       });
  //   }

  // }

  // getPassages(shortName: string): void {
  //   if (this._activatedRoute.snapshot.paramMap) {
  //     this._passageService.getPassages(shortName).subscribe(value => {
  //       this._passages = value.passages;
  //       this._stopName = value.stopName;
  //       this._stopShortName = value.stopShortName;
  //     },
  //       error => {
  //         console.log(error);
  //         console.log(error.status);
  //         console.log(error.error);
  //       });
  //   }
  // }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue == undefined) {
      this.data = new Feature(new Point([0, 0]));
    } else {
      this.data = changes.data.currentValue;
      if (this.data.getProperties().thing == "vehicle") {
        //console.log(changes.data.currentValue.getProperties().tripId, changes.data.currentValue.getProperties().id)
        //this._tripSingleComponent.getTrips(changes.data.currentValue.getProperties().tripId, changes.data.currentValue.getProperties().id);
      } else if (this.data.getProperties().thing == "stop") {
        //console.log(changes.data.currentValue.getProperties().shortName);
        //this.getPassages(changes.data.currentValue.getProperties().shortName);
      }
    }
  }

  // get trips(): Array<Trip> {
  //   return this._trips;
  // }

  // get passages(): Array<Passage> {
  //   return this._passages;
  // }

  // get trip(): Trip {
  //   return this._trip;
  // }

  // get passage(): Passage {
  //   return this._passage;
  // }

  // // get directionText(): string {
  // //   return this._directionText;
  // // }

  // // get routeName(): number {
  // //   return this._routeName;
  // // }

  // get stopName(): string {
  //   return this._stopName;
  // }

  // get stopShortName(): number {
  //   return this._stopShortName;
  // }

  // get sth(): any {
  //   return this._sth;
  // }
}
