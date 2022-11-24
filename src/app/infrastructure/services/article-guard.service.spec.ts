import { TestBed } from '@angular/core/testing';

import { ArticleGuardService } from './article-guard.service';

describe('ArticleGuardService', () => {
  let service: ArticleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
