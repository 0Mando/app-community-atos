import { TestBed } from '@angular/core/testing';

import { MyprofileService } from './myprofile.service';

describe('MyprofileService', () => {
  let service: MyprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
