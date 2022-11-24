import { TestBed } from '@angular/core/testing';

import { CrendentialsGuard } from './crendentials.guard';

describe('CrendentialsGuard', () => {
  let guard: CrendentialsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CrendentialsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
