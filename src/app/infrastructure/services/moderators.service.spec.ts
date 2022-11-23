import { TestBed } from '@angular/core/testing';

import { ModeratorsService } from './moderators.service';

describe('ModeratorsService', () => {
  let service: ModeratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeratorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
