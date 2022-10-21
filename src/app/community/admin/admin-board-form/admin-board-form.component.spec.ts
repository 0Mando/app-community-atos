import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoardFormComponent } from './admin-board-form.component';

describe('AdminBoardFormComponent', () => {
  let component: AdminBoardFormComponent;
  let fixture: ComponentFixture<AdminBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
