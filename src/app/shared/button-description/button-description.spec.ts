import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDescription } from './button-description';

describe('ButtonDescription', () => {
  let component: ButtonDescription;
  let fixture: ComponentFixture<ButtonDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
