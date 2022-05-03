import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageSingleComponent } from './passage-single.component';

describe('PassageSingleComponent', () => {
  let component: PassageSingleComponent;
  let fixture: ComponentFixture<PassageSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassageSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
