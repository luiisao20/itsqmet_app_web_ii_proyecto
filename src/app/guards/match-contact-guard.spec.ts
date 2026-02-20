import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { matchContactGuard } from './match-contact-guard';

describe('matchContactGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => matchContactGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
