import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaTimelineComponent } from './india-timeline.component';

describe('IndiaTimelineComponent', () => {
  let component: IndiaTimelineComponent;
  let fixture: ComponentFixture<IndiaTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiaTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
