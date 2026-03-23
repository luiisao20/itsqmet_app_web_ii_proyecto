import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFunction } from './movie-function';

describe('MovieFunction', () => {
  let component: MovieFunction;
  let fixture: ComponentFixture<MovieFunction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieFunction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieFunction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
