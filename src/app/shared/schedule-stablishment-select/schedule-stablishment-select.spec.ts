import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleStablishmentSelect } from './schedule-stablishment-select';

describe('ScheduleStablishmentSelect', () => {
  let component: ScheduleStablishmentSelect;
  let fixture: ComponentFixture<ScheduleStablishmentSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleStablishmentSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleStablishmentSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
