import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSingleComponent } from './route-single.component';

describe('RouteSingleComponent', () => {
  let component: RouteSingleComponent;
  let fixture: ComponentFixture<RouteSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
