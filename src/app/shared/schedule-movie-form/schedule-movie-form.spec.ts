import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMovieForm } from './schedule-movie-form';

describe('ScheduleMovieForm', () => {
  let component: ScheduleMovieForm;
  let fixture: ComponentFixture<ScheduleMovieForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleMovieForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleMovieForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
