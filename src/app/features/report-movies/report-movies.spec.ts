import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMovies } from './report-movies';

describe('ReportMovies', () => {
  let component: ReportMovies;
  let fixture: ComponentFixture<ReportMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMovies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
