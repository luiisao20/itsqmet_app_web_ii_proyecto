import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSchedule } from './movies-schedule';

describe('MoviesSchedule', () => {
  let component: MoviesSchedule;
  let fixture: ComponentFixture<MoviesSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
