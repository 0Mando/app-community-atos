import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoardItemComponent } from './card-board-item.component';

describe('CardBoardItemComponent', () => {
  let component: CardBoardItemComponent;
  let fixture: ComponentFixture<CardBoardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
