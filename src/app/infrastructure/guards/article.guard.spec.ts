import { TestBed } from '@angular/core/testing';

import { ArticleGuard } from './article.guard';

describe('ArticleGuard', () => {
  let guard: ArticleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ArticleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
