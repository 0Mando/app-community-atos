import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsEmptyComponent } from './channels-empty.component';

describe('ChannelsEmptyComponent', () => {
  let component: ChannelsEmptyComponent;
  let fixture: ComponentFixture<ChannelsEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelsEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
