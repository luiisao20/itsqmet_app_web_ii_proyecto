import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFinancial } from './report-financial';

describe('ReportFinancial', () => {
  let component: ReportFinancial;
  let fixture: ComponentFixture<ReportFinancial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFinancial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFinancial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
