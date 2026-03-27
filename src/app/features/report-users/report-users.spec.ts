import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsers } from './report-users';

describe('ReportUsers', () => {
  let component: ReportUsers;
  let fixture: ComponentFixture<ReportUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
