import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsCard } from './benefits-card';

describe('BenefitsCard', () => {
  let component: BenefitsCard;
  let fixture: ComponentFixture<BenefitsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
