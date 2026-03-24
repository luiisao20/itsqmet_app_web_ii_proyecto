import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperSchedule } from './stepper-schedule';

describe('StepperSchedule', () => {
  let component: StepperSchedule;
  let fixture: ComponentFixture<StepperSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
