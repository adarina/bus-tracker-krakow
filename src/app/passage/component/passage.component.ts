import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeatureLike } from 'ol/Feature';
import { Passage } from '../model/passage';
import { PassageService } from '../service/passage.service';


@Component({
  selector: 'app-passage',
  templateUrl: './passage.component.html',
  styleUrls: ['./passage.component.css']
})
export class PassageComponent implements OnInit {

  private _passages: Array<Passage>;

  private _passage: Passage;

  private _stopName: string;

  private _stopShortName: number;

  @Input() data: FeatureLike;

  constructor(private _activatedRoute: ActivatedRoute, private _passageService: PassageService) { }

  getPassages(shortName: string): void {
    if (this._activatedRoute.snapshot.paramMap) {
      this._passageService.getPassages(shortName).subscribe(value => {
        this._passages = value.passages;
        this._stopName = value.stopName;
        this._stopShortName = value.stopShortName;
      },
        error => {
          console.log(error);
          console.log(error.status);
          console.log(error.error);
        });
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data.getProperties().thing == "stop") {
      this.getPassages(this.data.getProperties().shortName);
    }
  }

  get passages(): Array<Passage> {
    return this._passages;
  }

  get passage(): Passage {
    return this._passage;
  }

  get stopName(): string {
    return this._stopName;
  }

  get stopShortName(): number {
    return this._stopShortName;
  }
}
