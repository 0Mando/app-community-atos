import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChannelComponent } from './form-channel.component';

describe('FormChannelComponent', () => {
  let component: FormChannelComponent;
  let fixture: ComponentFixture<FormChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
