import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSingleComponent } from './trip-single.component';

describe('TripSingleComponent', () => {
  let component: TripSingleComponent;
  let fixture: ComponentFixture<TripSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
