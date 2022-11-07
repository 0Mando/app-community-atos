import { TestBed } from '@angular/core/testing';

import { BoardCRUDService } from './board-crud.service';

describe('BoardCRUDService', () => {
  let service: BoardCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
