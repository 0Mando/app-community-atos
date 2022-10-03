import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoardComponent } from './list-board.component';

describe('ListBoardComponent', () => {
  let component: ListBoardComponent;
  let fixture: ComponentFixture<ListBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
