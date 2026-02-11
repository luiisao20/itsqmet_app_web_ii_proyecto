import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsType } from './seats-type';

describe('SeatsType', () => {
  let component: SeatsType;
  let fixture: ComponentFixture<SeatsType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatsType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
