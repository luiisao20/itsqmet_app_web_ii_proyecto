import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StablishmentSchedule } from './stablishment-schedule';

describe('StablishmentSchedule', () => {
  let component: StablishmentSchedule;
  let fixture: ComponentFixture<StablishmentSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StablishmentSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StablishmentSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
