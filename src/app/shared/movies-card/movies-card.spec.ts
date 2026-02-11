import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCard } from './movies-card';

describe('MoviesCard', () => {
  let component: MoviesCard;
  let fixture: ComponentFixture<MoviesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
