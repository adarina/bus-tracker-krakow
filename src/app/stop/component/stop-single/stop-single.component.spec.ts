import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSingleComponent } from './stop-single.component';

describe('StopSingleComponent', () => {
  let component: StopSingleComponent;
  let fixture: ComponentFixture<StopSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
