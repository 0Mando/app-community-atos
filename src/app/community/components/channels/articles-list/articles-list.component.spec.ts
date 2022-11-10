import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelArticlesListComponent } from './articles-list.component';

describe('ArticlesListComponent', () => {
  let component: ChannelArticlesListComponent;
  let fixture: ComponentFixture<ChannelArticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelArticlesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
