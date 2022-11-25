import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelArticleCardComponent } from './channel-article-card.component';

describe('ChannelArticleCardComponent', () => {
  let component: ChannelArticleCardComponent;
  let fixture: ComponentFixture<ChannelArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelArticleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
