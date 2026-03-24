import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StablishmentsTable } from './stablishments-table';

describe('StablishmentsTable', () => {
  let component: StablishmentsTable;
  let fixture: ComponentFixture<StablishmentsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StablishmentsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StablishmentsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
