import { Component, Input, OnInit } from '@angular/core';
import { Stop } from '../../model/stop';

@Component({
  selector: 'app-stop-single',
  templateUrl: './stop-single.component.html',
  styleUrls: ['./stop-single.component.css']
})
export class StopSingleComponent implements OnInit {

  private _stop: Stop;

  id: number;

  name: string;


  constructor() { }

  ngOnInit(): void {
  }

  get stop(): Stop {
    return this._stop;
  }

  @Input()
  set stop(stop: Stop) {
    this._stop = stop;
  }

}
