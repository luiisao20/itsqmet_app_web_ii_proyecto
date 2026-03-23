import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchedules } from './admin-schedules';

describe('AdminSchedules', () => {
  let component: AdminSchedules;
  let fixture: ComponentFixture<AdminSchedules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSchedules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSchedules);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
