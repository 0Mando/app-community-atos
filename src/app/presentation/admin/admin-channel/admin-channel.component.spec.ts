import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChannelComponent } from './admin-channel.component';

describe('AdminChannelComponent', () => {
  let component: AdminChannelComponent;
  let fixture: ComponentFixture<AdminChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
