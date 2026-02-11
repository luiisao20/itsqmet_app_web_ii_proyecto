import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBuy } from './movie-buy';

describe('MovieBuy', () => {
  let component: MovieBuy;
  let fixture: ComponentFixture<MovieBuy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieBuy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBuy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
