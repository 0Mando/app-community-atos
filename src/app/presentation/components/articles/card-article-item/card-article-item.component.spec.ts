import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArticleItemComponent } from './card-article-item.component';

describe('CardArticleItemComponent', () => {
  let component: CardArticleItemComponent;
  let fixture: ComponentFixture<CardArticleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardArticleItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
