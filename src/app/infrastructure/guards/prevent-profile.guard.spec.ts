import { TestBed } from '@angular/core/testing';

import { PreventProfileGuard } from './prevent-profile.guard';

describe('PreventProfileGuard', () => {
  let guard: PreventProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
