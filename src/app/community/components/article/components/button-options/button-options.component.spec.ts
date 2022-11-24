import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOptionsComponent } from './button-options.component';

describe('ButtonOptionsComponent', () => {
  let component: ButtonOptionsComponent;
  let fixture: ComponentFixture<ButtonOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
