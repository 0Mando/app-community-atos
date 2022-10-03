import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBoardComponent } from './form-board.component';

describe('FormBoardComponent', () => {
  let component: FormBoardComponent;
  let fixture: ComponentFixture<FormBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
