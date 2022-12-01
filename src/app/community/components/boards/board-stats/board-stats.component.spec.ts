import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardStatsComponent } from './board-stats.component';

describe('BoardStatsComponent', () => {
  let component: BoardStatsComponent;
  let fixture: ComponentFixture<BoardStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
